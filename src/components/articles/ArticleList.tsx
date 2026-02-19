"use client";

import { toast } from "react-toastify";

import CommonList from "@/src/components/shared/list/CommonList";
import { INews } from "@/src/types/news.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { articleColumns } from "./ArticleColumns";

interface Props {
	data: INews[];
	page: number;
	totalPages: number;
}

const ArticleList: React.FC<Props> = ({ data, page, totalPages }) => {
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
				columns={articleColumns}
				isLoading={isLoading}
				onEdit={(item) => router.push(`/articles/update/${item.id}`)}
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

export default ArticleList;
