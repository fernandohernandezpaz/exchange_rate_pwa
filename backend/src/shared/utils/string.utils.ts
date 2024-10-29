export const createQueryString = (parameters: Record<string, any>): string => {
	const params = new URLSearchParams(parameters);

	return params.toString();
};

export const joinURL = (domain: string, _path: string): string => {
	return new URL(_path, domain).toString();
};
