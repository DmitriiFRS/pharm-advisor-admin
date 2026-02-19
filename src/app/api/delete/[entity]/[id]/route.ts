import { ENDPOINTS } from "@/src/consts/endpoints";
import { bffErrorParse } from "@/src/helpers/errors/bffErrorParse";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextResponse } from "next/server";

const ENDPOINT_MAP = {
	news: ENDPOINTS.DELETE_NEWS,
	faqs: ENDPOINTS.DELETE_FAQS,
} as const;

export async function DELETE(req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const { entity, id } = await params;

	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}

	if (ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP] === undefined) {
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}

	const endpoint = ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP];
	const url = `${BACKEND_URL}/${endpoint}/${id}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		const error = await bffErrorParse(response);
		return NextResponse.json({ error }, { status: response.status });
	}

	return NextResponse.json({ success: true });
}
