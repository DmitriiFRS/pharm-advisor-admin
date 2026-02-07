import ContactsForm from "@/src/components/contacts/ContactsForm";

export default function ContactsPage() {
	// Mock data - in real app this would be fetched from API
	const initialData = {
		phone: "+998 71 200 00 00",
		email: "info@pharmadvisor.uz",
		telegram: "https://t.me/pharmadvisor",
		address: "г. Ташкент, Шайхантахурский район, ул. Навои, 1",
		instagram: "https://instagram.com/pharmadvisor",
		googleMaps: "https://maps.google.com",
	};

	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<h1 className="text-24 font-bold text-black-primary">Контакты</h1>
			</div>

			<ContactsForm initialData={initialData} />
		</div>
	);
}
