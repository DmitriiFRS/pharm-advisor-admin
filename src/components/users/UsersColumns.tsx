import { IUserData } from "@/src/types/user.type";
import { Column } from "@/src/components/shared/list/CommonList";

export const usersColumns: Column<IUserData>[] = [
	{
		header: "ID",
		accessorKey: "id",
	},
	{
		header: "Имя",
		accessorKey: "name",
	},
	{
		header: "Email",
		accessorKey: "email",
	},
	{
		header: "Телефон",
		accessorKey: "phoneNumber",
	},
];
