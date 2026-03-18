import ServiceCreateForm from "@/src/components/services/ServiceCreateForm";
import ServiceWrapper from "@/src/components/services/ServiceWrapper";

export default function CreateServicePage() {
	return (
		<ServiceWrapper title="Создание услуги">
			<ServiceCreateForm />
		</ServiceWrapper>
	);
}
