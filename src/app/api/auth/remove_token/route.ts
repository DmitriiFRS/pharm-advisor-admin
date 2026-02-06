import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");

		const loginUrl = new URL("/signin", process.env.NEXT_PUBLIC_CLIENT_URL);
		return NextResponse.redirect(loginUrl);
	} catch (error) {
		console.error("Ошибка при выходе:", error);
		const loginUrl = new URL("/signin", process.env.NEXT_PUBLIC_CLIENT_URL);
		return NextResponse.redirect(loginUrl);
	}
}
