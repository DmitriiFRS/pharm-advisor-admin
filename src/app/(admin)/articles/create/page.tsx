import ArticleCreateForm from "@/src/components/articles/ArticleCreateForm";
import ArticleWrapper from "@/src/components/articles/ArticleWrapper";

export default function CreateNewsPage() {
	return (
		<ArticleWrapper title="Создание статьи">
			<ArticleCreateForm />
		</ArticleWrapper>
	);
}
