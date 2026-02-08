import { ENDPOINTS } from "@/src/consts/endpoints";
import { bffErrorParse } from "@/src/helpers/errors/bffErrorParse";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextResponse } from "next/server";

const ENDPOINT_MAP = {
	news: ENDPOINTS.POST_NEWS,
} as const;

export async function POST(req: Request, { params }: { params: Promise<{ entity: string }> }) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const { entity } = await params;
	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}
	if (ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP] === undefined) {
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}

	let body: unknown = {};
	const contentType = req.headers.get("content-type") || "";

	if (contentType.includes("multipart/form-data")) {
		body = await req.formData();
	} else {
		body = await req.json();
	}

	const url = `${BACKEND_URL}/${ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP]}`;

	const fetchOptions: RequestInit = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: body instanceof FormData ? body : JSON.stringify(body),
	};

	if (!(body instanceof FormData)) {
		(fetchOptions.headers as Record<string, string>)["Content-Type"] = "application/json";
	}
	console.log("fetchOptions", fetchOptions);
	const response = await fetch(url, fetchOptions);
	if (!response.ok || response.status >= 400) {
		const error = await bffErrorParse(response);
		return NextResponse.json({ error }, { status: response.status });
	}
	return NextResponse.json(await response.json());
}
