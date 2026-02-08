export const bffErrorParse = async (error: Response) => {
	const errorData = await error.json();
	const errorMessage = Array.isArray(errorData?.message) ? errorData?.message?.join(", ") : errorData?.message;
	return errorMessage;
};
