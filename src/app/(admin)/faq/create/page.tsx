import FaqCreateForm from "@/src/components/faq/FaqCreateForm";
import FaqWrapper from "@/src/components/faq/FaqWrapper";

export default function CreateFaqPage() {
	return (
		<FaqWrapper title="Новый вопрос-ответ">
			<FaqCreateForm />
		</FaqWrapper>
	);
}
