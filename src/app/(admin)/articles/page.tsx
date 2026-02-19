import NewsList from "@/src/components/news/NewsList";
import { INews } from "@/src/types/news.type";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { cookies } from "next/headers";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface NewsResponse {
	data: INews[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const NewsPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	const res = await api.get<NewsResponse>({
		endpoint: ENDPOINTS.GET_NEWS,
		queryParams: {
			page,
			limit: 10,
		},
		path: "",
	});

	if (!res.data) {
		return <div>No news found</div>;
	}

	return <NewsList data={res.data} page={res.meta.page} totalPages={res.meta.totalPages} />;
};

export default NewsPage;
