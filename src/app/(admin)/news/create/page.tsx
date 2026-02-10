import NewsCreateForm from "@/src/components/news/NewsCreateForm";
import NewsWrapper from "@/src/components/news/NewsWrapper";

export default function CreateNewsPage() {
	return (
		<NewsWrapper title="Создание новости">
			<NewsCreateForm />
		</NewsWrapper>
	);
}
