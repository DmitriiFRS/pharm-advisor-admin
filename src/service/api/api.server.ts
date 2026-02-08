import "server-only";

export const apiServerService = (accessToken: string | undefined) => {
	return {
		get: async <T>({
			endpoint,
			queryParams,
			path,
		}: {
			endpoint: string;
			queryParams: Record<string, string | number | undefined>;
			path: string;
		}): Promise<T> => {
			const params = new URLSearchParams();
			Object.entries(queryParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					params.append(key, String(value));
				}
			});
			const queryString = params.toString();
			const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${queryString}`;
			try {
				const response = await fetch(fullEndpoint, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					cache: "no-store",
				});
				return await response.json();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},

		post: async <T>({ entity, data }: { entity: string; data: T }) => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${entity}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return await response.json();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
	};
};
