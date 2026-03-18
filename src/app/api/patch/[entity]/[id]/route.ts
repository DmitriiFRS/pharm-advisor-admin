import { ENDPOINTS } from "@/src/consts/endpoints";
import { bffErrorParse } from "@/src/helpers/errors/bffErrorParse";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextResponse } from "next/server";

const ENDPOINT_MAP = {
	news: ENDPOINTS.PATCH_NEWS,
	faqs: ENDPOINTS.PATCH_FAQS,
	services: ENDPOINTS.PATCH_SERVICES,
} as const;

export async function PATCH(req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const { entity, id } = await params;

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

	const endpoint = ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP];
	const url = `${BACKEND_URL}/${endpoint}/${id}`;

	const fetchOptions: RequestInit = {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: body instanceof FormData ? body : JSON.stringify(body),
	};

	if (!(body instanceof FormData)) {
		(fetchOptions.headers as Record<string, string>)["Content-Type"] = "application/json";
	}

	try {
		const response = await fetch(url, fetchOptions);

		if (!response.ok) {
			const error = await bffErrorParse(response);
			return NextResponse.json({ error }, { status: response.status });
		}

		return NextResponse.json(await response.json());
	} catch (error) {
		console.error("PATCH request error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
