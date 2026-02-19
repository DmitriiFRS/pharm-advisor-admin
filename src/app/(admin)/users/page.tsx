import UsersList from "@/src/components/users/UsersList";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { IUserData } from "@/src/types/user.type";
import { cookies } from "next/headers";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface UsersResponse {
	data: IUserData[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const UsersPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;
	const sort = searchParams.sort as string;

	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	const res = await api.get<UsersResponse>({
		endpoint: ENDPOINTS.GET_USERS,
		queryParams: {
			page,
			limit: 10,
			...(sort && { sort }),
		},
		path: "",
	});

	if (!res.data) {
		return <div className="p-8">No users found</div>;
	}
	return <UsersList data={res.data} page={res.meta.page} totalPages={res.meta.totalPages} />;
};

export default UsersPage;
