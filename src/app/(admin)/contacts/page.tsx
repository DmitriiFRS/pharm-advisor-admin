import ContactsForm from "@/src/components/contacts/ContactsForm";
import { ENDPOINTS } from "@/src/consts/endpoints";
import { apiServerService } from "@/src/service/api/api.server";
import { IContact } from "@/src/types/contacts.type";
import { cookies } from "next/headers";

export default async function ContactsPage() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const api = apiServerService(accessToken);

	const res = await api.get<IContact>({
		endpoint: ENDPOINTS.GET_CONTACTS,
		queryParams: {},
		path: "",
	});

	if (!res.data) {
		return <div>No contacts found</div>;
	}
	console.log(res.data);
	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<h1 className="text-24 font-bold text-black-primary">Контакты</h1>
			</div>

			<ContactsForm initialData={res.data} />
		</div>
	);
}
