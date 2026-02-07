"use client";

import CommonList from "@/src/components/shared/list/CommonList";
import { useState } from "react";

export interface INews {
	id: number;
	title: string;
	description: string;
	createdAt: string;
}

interface Props {
	data: INews[];
	page: number;
	totalPages: number;
}

const NewsList: React.FC<Props> = ({ data, page, totalPages }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-24 font-bold text-black-primary">Все новости</h1>
			</div>

			<CommonList
				data={data}
				columns={[
					{ header: "Заголовок", accessorKey: "title" },
					{
						header: "Описание",
						cell: (row) => <div className="line-clamp-2 max-w-[600px] text-gray-600">{row.description}</div>,
					},
					{ header: "Дата публикации", accessorKey: "createdAt" },
				]}
				isLoading={isLoading}
				onEdit={(item) => console.log("Edit", item)}
				onDelete={(item) => console.log("Delete", item)}
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

export default NewsList;
