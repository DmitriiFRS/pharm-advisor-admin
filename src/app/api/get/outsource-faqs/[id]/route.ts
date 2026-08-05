import { ENDPOINTS } from "@/src/consts/endpoints";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const { id } = await params;

	if (!process.env.NEXT_PUBLIC_API_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}

	try {
		const response = await fetch(`${BACKEND_URL}/${ENDPOINTS.GET_OUTSOURCE_FAQS_BY_ID}/${id}`, {
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
