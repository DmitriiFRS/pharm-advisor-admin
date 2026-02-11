"use client";

import { IRegistrationGraph } from "@/src/types/dashboard.type";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RegistrationChart = ({ data }: { data: IRegistrationGraph[] }) => {
	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<h2 className="text-18 font-bold mb-6 text-black-primary">Статистика регистраций</h2>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
						<YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
						<Tooltip
							cursor={{ fill: "#f3f4f6" }}
							contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
						/>
						<Bar dataKey="users" fill="#e94190" radius={[4, 4, 0, 0]} barSize={30} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default RegistrationChart;
