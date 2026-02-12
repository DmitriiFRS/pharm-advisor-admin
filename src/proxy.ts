import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/signin"];
const AUTH_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 1. Проверка публичного маршрута (без удаления локали)
	const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

	const accessToken = request.cookies.get("accessToken")?.value;
	const refreshToken = request.cookies.get("refreshToken")?.value;

	// 2. Токенов нет
	if (!accessToken || !refreshToken) {
		if (!isPublic) {
			return redirectToLogout(request);
		}
		return NextResponse.next();
	}

	// 3. Проверка валидности Access токена
	const isAccessTokenValid = await verifyAccessToken(accessToken);

	if (isAccessTokenValid) {
		if (isPublic) {
			return NextResponse.redirect(new URL("/", request.url));
		}
		return NextResponse.next();
	}

	// 4. Попытка рефреша токенов
	const newTokens = await refreshTokens(accessToken, refreshToken);

	if (newTokens) {
		// Создаем ответ для продолжения цепочки или редиректа если мы на публичном роуте
		const response = isPublic ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();

		// Устанавливаем новые куки в ответ для браузера
		response.cookies.set("accessToken", newTokens.accessToken);
		response.cookies.set("refreshToken", newTokens.refreshToken);

		return response;
	}

	// 5. Рефреш не удался
	if (!isPublic) {
		return redirectToLogout(request);
	}

	// Если маршрут не защищен, но токены протухли — удаляем их и пускаем дальше
	const response = NextResponse.next();
	response.cookies.delete("accessToken");
	response.cookies.delete("refreshToken");

	return response;
}

// Вспомогательные функции

function redirectToLogout(request: NextRequest) {
	const logoutUrl = new URL("/api/auth/remove_token", request.url);
	return NextResponse.redirect(logoutUrl);
}

async function verifyAccessToken(accessToken: string) {
	try {
		const response = await fetch(`${AUTH_API_URL}/users/get-me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});
		return response.ok;
	} catch {
		return false;
	}
}

async function refreshTokens(accessToken: string, refreshToken: string) {
	try {
		const response = await fetch(`${AUTH_API_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ refreshToken }),
			cache: "no-store",
		});

		if (response.ok) {
			const data = await response.json();
			return {
				accessToken: data.data.accessToken,
				refreshToken: data.data.refreshToken,
			};
		}
		return null;
	} catch {
		return null;
	}
}

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
