const mockUsers = [
	{ id: 1, name: "Иван Иванов", email: "ivan@example.com", phone: "+998 90 123 45 67" },
	{ id: 2, name: "Петр Петров", email: "petr@example.com", phone: "+998 90 234 56 78" },
	{ id: 3, name: "Анна Сидорова", email: "anna@example.com", phone: "+998 90 345 67 89" },
	{ id: 4, name: "Мария Козлова", email: "maria@example.com", phone: "+998 90 456 78 90" },
	{ id: 5, name: "Дмитрий Смирнов", email: "dmitry@example.com", phone: "+998 90 567 89 01" },
];

const LastRegistrations = () => {
	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<h2 className="text-18 font-bold mb-6 text-black-primary">Последние регистрации</h2>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100">
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Имя</th>
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Email</th>
							<th className="text-left py-3 px-4 text-14 font-medium text-gray-500">Телефон</th>
						</tr>
					</thead>
					<tbody>
						{mockUsers.map((user) => (
							<tr key={user.id} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
								<td className="py-3 px-4 text-14 text-black-primary font-medium">{user.name}</td>
								<td className="py-3 px-4 text-14 text-gray-600">{user.email}</td>
								<td className="py-3 px-4 text-14 text-gray-600">{user.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LastRegistrations;
