import { Column } from "@/src/components/shared/list/CommonList";
import { IFaq } from "@/src/types/faq.type";

export const faqColumns: Column<IFaq>[] = [
	{
		header: "Вопрос",
		cell: (row) => <div className="line-clamp-2 max-w-[400px]" dangerouslySetInnerHTML={{ __html: row.question }} />,
	},
	{
		header: "Ответ",
		cell: (row) => <div className="line-clamp-2 max-w-[600px] text-gray-600" dangerouslySetInnerHTML={{ __html: row.answer }} />,
	},
	{
		header: "Дата создания",
		cell: (row) => new Date(row.createdAt).toLocaleDateString("ru-RU"),
	},
];
