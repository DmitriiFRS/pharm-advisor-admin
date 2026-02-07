"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
	{ name: "Jan", users: 40 },
	{ name: "Feb", users: 30 },
	{ name: "Mar", users: 20 },
	{ name: "Apr", users: 27 },
	{ name: "May", users: 18 },
	{ name: "Jun", users: 23 },
	{ name: "Jul", users: 34 },
	{ name: "Aug", users: 45 },
	{ name: "Sep", users: 32 },
	{ name: "Oct", users: 50 },
	{ name: "Nov", users: 42 },
	{ name: "Dec", users: 60 },
];

const RegistrationChart = () => {
	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<h2 className="text-18 font-bold mb-6 text-black-primary">Статистика регистраций</h2>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
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
