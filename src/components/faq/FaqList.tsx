"use client";

import { toast } from "react-toastify";
import CommonList from "@/src/components/shared/list/CommonList";
import { IFaq } from "@/src/types/faq.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { faqColumns } from "./FaqColumns";

interface Props {
	data: IFaq[];
	page: number;
	totalPages: number;
}

const FaqList: React.FC<Props> = ({ data, page, totalPages }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleDelete = async (id: number) => {
		if (window.confirm("Вы уверены что хотите удалить?")) {
			try {
				setIsLoading(true);
				const res = await fetch(`/api/delete/faqs/${id}`, {
					method: "DELETE",
				});

				if (!res.ok) {
					throw new Error("Ошибка при удалении");
				}

				toast.success("FAQ успешно удален");
				router.refresh();
			} catch (error) {
				console.error(error);
				toast.error("Не удалось удалить FAQ");
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-24 font-bold text-black-primary">FAQ</h1>
			</div>

			<CommonList
				data={data}
				columns={faqColumns}
				isLoading={isLoading}
				onEdit={(item) => router.push(`/faq/update/${item.id}`)}
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

export default FaqList;
