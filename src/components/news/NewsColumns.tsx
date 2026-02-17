import { Column } from "@/src/components/shared/list/CommonList";
import { INews } from "@/src/types/news.type";

export const newsColumns: Column<INews>[] = [
	{ header: "Заголовок", accessorKey: "title" },
	{
		header: "Контент",
		cell: (row) => <div className="line-clamp-2 max-w-[600px] text-gray-600" dangerouslySetInnerHTML={{ __html: row.content }} />,
	},
	{
		header: "Дата публикации",
		cell: (row) => new Date(row.publishedAt || row.createdAt).toLocaleDateString("ru-RU"),
	},
	{
		header: "Статус",
		cell: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-12 ${row.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
			>
				{row.isPublished ? "Опубликовано" : "Черновик"}
			</span>
		),
	},
];
