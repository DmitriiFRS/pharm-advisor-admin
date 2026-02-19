import { IFaq } from "@/src/types/faq.type";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { cookies } from "next/headers";
import FaqList from "@/src/components/faq/FaqList";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface FaqResponse {
	data: IFaq[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const FaqPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	const res = await api.get<FaqResponse>({
		endpoint: ENDPOINTS.GET_FAQS,
		queryParams: {
			page,
			limit: 10,
		},
		path: "",
	});

	if (!res.data) {
		return <div>No FAQs found</div>;
	}

	return <FaqList data={res.data} page={res.meta.page} totalPages={res.meta.totalPages} />;
};

export default FaqPage;
