"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
	{ name: "Jan", users: 65 },
	{ name: "Feb", users: 59 },
	{ name: "Mar", users: 80 },
	{ name: "Apr", users: 81 },
	{ name: "May", users: 56 },
	{ name: "Jun", users: 55 },
	{ name: "Jul", users: 40 },
	{ name: "Aug", users: 70 },
	{ name: "Sep", users: 85 },
	{ name: "Oct", users: 95 },
	{ name: "Nov", users: 100 },
	{ name: "Dec", users: 110 },
];

const LoginStatsChart = () => {
	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<h2 className="text-18 font-bold mb-6 text-black-primary">Активность пользователей (вход)</h2>
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
						<Bar dataKey="users" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default LoginStatsChart;
