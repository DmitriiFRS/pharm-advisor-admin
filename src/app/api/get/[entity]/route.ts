import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { NextRequest, NextResponse } from "next/server";

const ENDPOINT_MAP: Record<string, string> = {
	user: "/user",
} as const;

export async function GET(req: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
	const { BACKEND_URL } = await getServerAuthContext();
	const awaitedParams = await params;
	const entityPathArray = awaitedParams.entity;
	if (!entityPathArray || entityPathArray.length === 0) {
		return NextResponse.json({ error: "Invalid API route. Entity path is missing." }, { status: 400 });
	}
	const [entity, ...dynamicParts] = entityPathArray;
	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}
	if (ENDPOINT_MAP[entity] === undefined) {
		console.error("Invalid entity type:", entity);
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}
	const basePath = ENDPOINT_MAP[entity];
	const searchParams = req.nextUrl.searchParams.toString();
	const cleanedBasePath = basePath.replace(/^\//, "");
	const finalDynamicPath = dynamicParts.join("/");
	let url = `${BACKEND_URL}/${cleanedBasePath}`;
	if (finalDynamicPath) {
		url += `/${finalDynamicPath}`;
	}
	if (searchParams) {
		url += `?${searchParams}`;
	}
	return NextResponse.json({ url });
}
