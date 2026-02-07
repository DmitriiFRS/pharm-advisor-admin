import RegistrationChart from "../../components/dashboard/RegistrationChart";
import LoginStatsChart from "../../components/dashboard/LoginStatsChart";
import LastRegistrations from "../../components/dashboard/LastRegistrations";
import LastLogins from "../../components/dashboard/LastLogins";

export default function Home() {
	return (
		<div className="p-8 flex flex-col gap-8 max-w-[1600px] mx-auto">
			<h1 className="text-24 font-bold text-black-primary">Дашборд</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<RegistrationChart />
				<LoginStatsChart />
				<LastRegistrations />
				<LastLogins />
			</div>
		</div>
	);
}
