"use client";

import { toast } from "react-toastify";

import CommonList from "@/src/components/shared/list/CommonList";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface INews {
	id: number;
	title: string;
	content: string;
	slug: string;
	isPublished: boolean;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
	imageId: number;
}

interface Props {
	data: INews[];
	page: number;
	totalPages: number;
}

const NewsList: React.FC<Props> = ({ data, page, totalPages }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleDelete = async (id: number) => {
		if (window.confirm("Вы уверены что хотите удалить?")) {
			try {
				setIsLoading(true);
				const res = await fetch(`/api/delete/news/${id}`, {
					method: "DELETE",
				});

				if (!res.ok) {
					throw new Error("Ошибка при удалении");
				}

				toast.success("Новость успешно удалена");
				router.refresh();
			} catch (error) {
				console.error(error);
				toast.error("Не удалось удалить новость");
			} finally {
				setIsLoading(false);
			}
		}
	};

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
						header: "Контент",
						cell: (row) => (
							<div className="line-clamp-2 max-w-[600px] text-gray-600" dangerouslySetInnerHTML={{ __html: row.content }} />
						),
					},
					{
						header: "Дата публикации",
						cell: (row) => new Date(row.publishedAt || row.createdAt).toLocaleDateString("ru-RU"),
					},
					{
						header: "Статус",
						cell: (row) => (
							<span
								className={`px-2 py-1 rounded-full text-12 ${
									row.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
								}`}
							>
								{row.isPublished ? "Опубликовано" : "Черновик"}
							</span>
						),
					},
				]}
				isLoading={isLoading}
				onEdit={(item) => router.push(`/news/update/${item.id}`)}
				onDelete={(item) => handleDelete(item.id)}
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
