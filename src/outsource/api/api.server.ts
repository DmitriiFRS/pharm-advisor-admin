import "server-only";

import { ENDPOINTS } from "@/src/consts/endpoints";
import { getServerAuthContext } from "@/src/helpers/getServerAuthContext";
import { ApiResponse, OutsourceDetail, OutsourceFaq } from "@/src/outsource/types/outsource.types";

export interface ServerLoadResult<T> {
	data?: T;
	error?: string;
	notFound?: boolean;
}

const getErrorMessage = async (response: Response, fallback: string) => {
	const errorData = await response.json().catch(() => ({}));
	const message = errorData?.error || errorData?.message;

	if (Array.isArray(message)) {
		return message.join(", ");
	}

	return message || fallback;
};

const getAdminData = async <T>(endpoint: string, fallback: string): Promise<ServerLoadResult<T>> => {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();

	if (!process.env.NEXT_PUBLIC_API_URL) {
		return { error: "Не настроен адрес backend API" };
	}

	try {
		const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		});

		if (response.status === 404) {
			return { notFound: true };
		}

		if (!response.ok) {
			return { error: await getErrorMessage(response, fallback) };
		}

		const result = (await response.json()) as ApiResponse<T>;
		return { data: result.data };
	} catch {
		return { error: fallback };
	}
};

export const getOutsourceAdmin = () =>
	getAdminData<OutsourceDetail>(ENDPOINTS.GET_OUTSOURCE, "Не удалось загрузить страницу аутсорса");

export const getOutsourceFaqsAdmin = () =>
	getAdminData<OutsourceFaq[]>(`${ENDPOINTS.GET_OUTSOURCE_FAQS}?page=1&limit=100`, "Не удалось загрузить FAQ аутсорса");
