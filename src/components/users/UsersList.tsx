"use client";

import CommonList from "@/src/components/shared/list/CommonList";
import { IUserData } from "@/src/types/user.type";
import { useState } from "react";
import { usersColumns } from "./UsersColumns";
import UsersFilter from "./UsersFilter";

interface Props {
	data: IUserData[];
	page: number;
	totalPages: number;
}

const UsersList: React.FC<Props> = ({ data, page, totalPages }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-24 font-bold text-black-primary">Пользователи</h1>
				<UsersFilter />
			</div>

			<CommonList
				data={data}
				columns={usersColumns}
				isLoading={isLoading}
				pagination={{
					page,
					totalPages,
					hasPreviousPage: page > 1,
					hasNextPage: page < totalPages,
					setLoading: setIsLoading,
					withFalseSetLoading: true,
				}}
			/>
		</div>
	);
};

export default UsersList;
