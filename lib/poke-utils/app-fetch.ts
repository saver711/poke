const getBaseUrl = (): string => {
	if (typeof window !== "undefined") {
		return "";
	}
	// I WILL NOT PROVIDE .env.example file, please make sure port 3000 is available
	return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const appFetch = (
	url: string,
	options?: RequestInit,
): Promise<Response> => {
	const baseUrl = getBaseUrl();
	const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

	return fetch(fullUrl, {
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
		...options,
	});
};
