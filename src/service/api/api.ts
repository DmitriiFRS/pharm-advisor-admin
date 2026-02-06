export const api = {
	async post<T>({ url, body, accessToken }: { url: string; body: T; accessToken?: string }) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
			},
			body: JSON.stringify(body),
		});
		return response.json();
	},

	async get<T>({ url, accessToken }: { url: string; accessToken?: string }) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
			},
		});
		return response.json();
	},
};
