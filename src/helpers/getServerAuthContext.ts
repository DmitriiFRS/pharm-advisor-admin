import { cookies } from "next/headers";

export async function getServerAuthContext() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

	return { accessToken, refreshToken, BACKEND_URL };
}
