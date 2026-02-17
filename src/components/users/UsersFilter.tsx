"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const UsersFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSort = searchParams.get("sort") || "";

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set("sort", value);
		} else {
			params.delete("sort");
		}
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex items-center gap-4">
			<label className="text-14 font-medium text-gray-700">Сортировать по:</label>
			<select
				value={currentSort}
				onChange={handleSortChange}
				className="px-3 py-2 border border-gray-300 rounded-lg text-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="">По умолчанию</option>
				<option value="name">Имени</option>
				<option value="email">Email</option>
				<option value="role">Роли</option>
			</select>
		</div>
	);
};

export default UsersFilter;
