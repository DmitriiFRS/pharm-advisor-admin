import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { accessToken, refreshToken } = await req.json();

		if (!accessToken || !refreshToken) {
			return NextResponse.json({ error: "Missing accessToken or refreshToken" }, { status: 400 });
		}

		const response = NextResponse.json({ success: true });

		response.cookies.set("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 15, // 15 дней
		});

		response.cookies.set("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 15, // 15 дней
		});
		console.log("refreshToken", refreshToken);
		return response;
	} catch (error) {
		console.error("error:", error);
		return NextResponse.json({ error: "Failed to set cookies" }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const url = req.nextUrl;
	const accessToken = url.searchParams.get("accessToken");
	const refreshToken = url.searchParams.get("refreshToken");
	const redirectUrl = url.searchParams.get("redirectUrl") || "/";

	if (!accessToken || !refreshToken) {
		return NextResponse.redirect(new URL("/api/auth/remove_token", req.url));
	}

	const response = NextResponse.redirect(new URL(redirectUrl, req.url));

	response.cookies.set("accessToken", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 15,
	});

	response.cookies.set("refreshToken", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 15,
	});

	return response;
}
