import "server-only";
import { AUTH_ENDPOINTS } from "../endpoints";

export const authServerApi = {
	getUser: async (accessToken?: string) => {
		if (!accessToken) {
			return null;
		}
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${AUTH_ENDPOINTS.GET_USER}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				cache: "no-store",
			});
			if (!response.ok) {
				return null;
			}
			const data = await response.json();
			return data?.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async refreshAccessToken(accessToken: string, refreshToken: string) {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ refreshToken }),
			});
			const newTokenData = await response.json();

			if (response.status === 201 || response.status === 200) {
				return {
					accessToken: newTokenData?.data?.accessToken,
					refreshToken: newTokenData?.data?.refreshToken,
				};
			}
			if (!newTokenData?.data?.accessToken) {
				return null;
			}
			return {
				accessToken: newTokenData?.data?.accessToken,
				refreshToken: newTokenData?.data?.refreshToken,
			};
		} catch (error) {
			console.error(error);
			return null;
		}
	},
};
