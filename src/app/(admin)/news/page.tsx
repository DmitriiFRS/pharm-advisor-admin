import NewsList, { INews } from "@/src/components/news/NewsList";

const MOCK_NEWS: INews[] = Array.from({ length: 20 }).map((_, i) => ({
	id: i + 1,
	title: `Новость ${i + 1}`,
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
	createdAt: new Date().toLocaleDateString("ru-RU"),
}));

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const NewsPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.pageNumber) || 1;

	// Mock pagination logic (Simulation of API)
	const itemsPerPage = 10;
	const totalPages = Math.ceil(MOCK_NEWS.length / itemsPerPage);
	const currentData = MOCK_NEWS.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	return <NewsList data={currentData} page={page} totalPages={totalPages} />;
};

export default NewsPage;
