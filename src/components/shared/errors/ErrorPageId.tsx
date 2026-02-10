import { notFound } from "next/navigation";

interface Props {
	error: unknown;
}

const ErrorPageId: React.FC<Props> = ({ error }) => {
	const is404 =
		(typeof error === "object" && error !== null && "status" in error && (error as { status?: unknown }).status === 404) ||
		(error instanceof Error && error.message.includes("status: 404"));

	if (is404) return notFound();
	if (error instanceof Error && error.message === "NEXT_REDIRECT") {
		throw error;
	}
	return <div>{error instanceof Error ? error.message : String(error)}</div>;
};

export default ErrorPageId;
