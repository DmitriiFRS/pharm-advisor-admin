const mockLogins = [
	{ id: 1, name: "Иван Иванов", email: "ivan@example.com", time: "10:45" },
	{ id: 2, name: "Мария Козлова", email: "maria@example.com", time: "10:30" },
	{ id: 3, name: "Сергей Петров", email: "sergey@example.com", time: "10:15" },
	{ id: 4, name: "Анна Сидорова", email: "anna@example.com", time: "09:50" },
	{ id: 5, name: "Дмитрий Смирнов", email: "dmitry@example.com", time: "09:45" },
];

const LastLogins = () => {
	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<h2 className="text-18 font-bold mb-6 text-black-primary">Последние входы</h2>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100">
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Имя</th>
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Email</th>
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Время</th>
						</tr>
					</thead>
					<tbody>
						{mockLogins.map((login) => (
							<tr key={login.id} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
								<td className="py-3 px-4 text-14 text-black-primary font-medium">{login.name}</td>
								<td className="py-3 px-4 text-14 text-gray-600">{login.email}</td>
								<td className="py-3 px-4 text-14 text-gray-600">{login.time}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LastLogins;
