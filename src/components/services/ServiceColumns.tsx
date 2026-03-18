import { Column } from "@/src/components/shared/list/CommonList";
import { IService } from "@/src/types/service.type";

export const serviceColumns: Column<IService>[] = [
	{
		header: "Название",
		cell: (row) => <div className="font-medium text-black-primary">{row.name}</div>,
	},
	{
		header: "Цена",
		cell: (row) => (row.price ? `${row.price} сум` : "Не указана"),
	},
	{
		header: "Подпись",
		cell: (row) => row.label,
	},
	{
		header: "Описание",
		cell: (row) => (
			<div className="col-span-2 line-clamp-2 max-w-[600px] text-gray-600" dangerouslySetInnerHTML={{ __html: row.description }} />
		),
	},
];
