import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { cookies } from "next/headers";
import { IService } from "@/src/types/service.type";
import ServiceList from "@/src/components/services/ServiceList";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ServiceResponse {
	data: IService[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const ServicesPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	const res = await api.get<ServiceResponse>({
		endpoint: ENDPOINTS.GET_SERVICES,
		queryParams: {
			page,
			limit: 10,
		},
		path: "",
	});

	if (!res.data) {
		return <div>No Services found</div>;
	}

	return <ServiceList data={res.data} page={res.meta.page} totalPages={res.meta.totalPages} />;
};

export default ServicesPage;
