import ServiceCreateForm from "@/src/components/services/ServiceCreateForm";
import ServiceWrapper from "@/src/components/services/ServiceWrapper";
import ErrorPageId from "@/src/components/shared/errors/ErrorPageId";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { NewsDetail } from "@/src/service/form/schemas/news.schema";
import { ServiceDetail } from "@/src/service/form/schemas/service.schema";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}

const CreateOrUpdateService: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	try {
		const data = await api.get<{ data: ServiceDetail }>({
			endpoint: `${ENDPOINTS.GET_SERVICES_BY_ID}/${id}`,
			queryParams: {},
			path: "",
		});

		if (!data?.data) return notFound();
		return (
			<ServiceWrapper title="Редактирование сервиса">
				<ServiceCreateForm initialData={data.data} />
			</ServiceWrapper>
		);
	} catch (error) {
		return <ErrorPageId error={error} />;
	}
};

export default CreateOrUpdateService;
