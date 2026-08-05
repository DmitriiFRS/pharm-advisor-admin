import { ENDPOINTS } from "@/src/consts/endpoints";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();

	if (!process.env.NEXT_PUBLIC_API_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}

	const searchParams = req.nextUrl.searchParams.toString();
	const query = searchParams || "page=1&limit=100";

	try {
		const response = await fetch(`${BACKEND_URL}/${ENDPOINTS.GET_OUTSOURCE_FAQS}?${query}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		});
		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			return NextResponse.json(
				{ error: data?.error || data?.message || "Не удалось загрузить FAQ аутсорса" },
				{ status: response.status }
			);
		}

		return NextResponse.json(data);
	} catch {
		return NextResponse.json({ error: "Не удалось загрузить FAQ аутсорса" }, { status: 500 });
	}
}
