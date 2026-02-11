import RegistrationChart from "../../components/dashboard/RegistrationChart";
import LoginStatsChart from "../../components/dashboard/LoginStatsChart";
import LastRegistrations from "../../components/dashboard/LastRegistrations";
import LastLogins from "../../components/dashboard/LastLogins";
import { apiServerService } from "@/src/service/api/api.server";
import { cookies } from "next/headers";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { ILoginGraphData, IRegistrationGraphData, IActivityResponse } from "@/src/types/dashboard.type";

export default async function Home() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);
	const regsResponse = await api.get<IRegistrationGraphData>({
		endpoint: ENDPOINTS.GET_USER_REGISTRATIONS,
		queryParams: {},
		path: "",
	});
	const loginResponse = await api.get<ILoginGraphData>({
		endpoint: ENDPOINTS.GET_USER_LOGINS,
		queryParams: {},
		path: "",
	});

	const activityResponse = await api.get<IActivityResponse>({
		endpoint: ENDPOINTS.GET_ACTIVITY,
		queryParams: {},
		path: "",
	});

	return (
		<div className="p-8 flex flex-col gap-8 max-w-[1600px] mx-auto">
			<h1 className="text-24 font-bold text-black-primary">Дашборд</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<RegistrationChart data={regsResponse.data} />
				<LoginStatsChart data={loginResponse.data} />
				<LastRegistrations data={activityResponse.data.latestRegistrations} />
				<LastLogins data={activityResponse.data.latestLogins} />
			</div>
		</div>
	);
}
