import NewsCreateForm from "@/src/components/news/NewsCreateForm";
import NewsWrapper from "@/src/components/news/NewsWrapper";
import ErrorPageId from "@/src/components/shared/errors/ErrorPageId";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { NewsDetail } from "@/src/service/form/schemas/news.schema";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}

const CreateOrUpdateNews: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	try {
		const data = await api.get<{ data: NewsDetail }>({
			endpoint: `${ENDPOINTS.GET_NEWS_BY_ID}/${id}`,
			queryParams: {},
			path: "",
		});

		if (!data?.data) return notFound();
		console.log(data.data);
		return (
			<NewsWrapper title="Редактирование новости">
				<NewsCreateForm initialData={data.data} />
			</NewsWrapper>
		);
	} catch (error) {
		return <ErrorPageId error={error} />;
	}
};

export default CreateOrUpdateNews;
