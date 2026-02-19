import FaqCreateForm from "@/src/components/faq/FaqCreateForm";
import FaqWrapper from "@/src/components/faq/FaqWrapper";
import ErrorPageId from "@/src/components/shared/errors/ErrorPageId";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { FaqDetail } from "@/src/service/form/schemas/faq.schema";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}

const CreateOrUpdateFaq: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	try {
		const data = await api.get<{ data: FaqDetail }>({
			endpoint: `${ENDPOINTS.GET_FAQS_BY_ID}/${id}`,
			queryParams: {},
			path: "",
		});

		if (!data?.data) return notFound();
		return (
			<FaqWrapper title="Редактирование вопроса-ответа">
				<FaqCreateForm initialData={data.data} />
			</FaqWrapper>
		);
	} catch (error) {
		return <ErrorPageId error={error} />;
	}
};

export default CreateOrUpdateFaq;
