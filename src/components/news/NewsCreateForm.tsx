"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, NewsFormData, NewsDetail } from "@/src/service/form/schemas/news.schema";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import PdfUpload from "@/src/components/shared/inputs/PdfUpload";
import RichTextInput from "@/src/components/shared/inputs/RichTextInput";
import CommonInput from "@/src/components/shared/inputs/CommonInput";
import SingleDateSelect from "@/src/components/shared/inputs/SingleDateSelect";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";

interface Props {
	initialData?: NewsDetail;
}

const NewsCreateForm: React.FC<Props> = ({ initialData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		control,
		formState: { errors },
	} = useForm<NewsFormData>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			titleRu: getLocalizedContent(initialData?.translations, "ru", "title"),
			titleUz: getLocalizedContent(initialData?.translations, "uz", "title"),
			descriptionRu: getLocalizedContent(initialData?.translations, "ru", "content"),
			descriptionUz: getLocalizedContent(initialData?.translations, "uz", "content"),
			publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString() : "",
			image: initialData?.media?.url || null,
			pdf: initialData?.pdf || null,
		},
	});

	const onSubmit = async (data: NewsFormData) => {
		try {
			setIsLoading(true);

			const formData = new FormData();
			formData.append("titleRu", data.titleRu);
			formData.append("titleUz", data.titleUz);
			formData.append("descriptionRu", data.descriptionRu);
			formData.append("descriptionUz", data.descriptionUz);
			formData.append("publishedAt", data.publishedAt);

			if (data.image instanceof File) {
				formData.append("image", data.image);
			}

			// Если загружаем новый файл (замена) или удалили картинку (null) и была старая картинка -> отправляем imageId для удаления старой
			if ((data.image instanceof File || data.image === null) && initialData?.media?.id) {
				formData.append("imageId", String(initialData.media.id));
			}

			if (data.pdf instanceof File) {
				formData.append("pdf", data.pdf);
			}

			// Аналогично для PDF
			if ((data.pdf instanceof File || data.pdf === null) && initialData?.pdf?.id) {
				formData.append("pdfId", String(initialData.pdf.id));
			}

			const url = initialData?.id ? `/api/patch/news/${initialData.id}` : "/api/post/news";
			const method = initialData?.id ? "PATCH" : "POST";
			console.log(formData);
			const response = await fetch(url, {
				method,
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Ошибка при сохранении новости");
			}

			toast.success(initialData?.id ? "Новость успешно обновлена" : "Новость успешно создана");

			if (!initialData?.id) {
				reset();
			} else {
				router.push("/news");
				router.refresh();
			}
		} catch (error: unknown) {
			toast.error((error as Error).message || "Ошибка при сохранении новости");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-[1200px] mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-6">
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<ImageUpload value={field.value} onChange={field.onChange} error={errors.image?.message as string} />
							)}
						/>

						<div className="space-y-4">
							<CommonInput
								register={register}
								error={errors.titleRu}
								title="Заголовок (RU)"
								name="titleRu"
								placeholder="Введите заголовок"
							/>

							<CommonInput
								register={register}
								error={errors.titleUz}
								title="Заголовок (UZ)"
								name="titleUz"
								placeholder="Sarlavhani kiriting"
							/>

							<SingleDateSelect
								name="publishedAt"
								setValue={setValue}
								watchedDateValue={watch("publishedAt")}
								error={errors.publishedAt}
								title="Дата публикации"
								placeholder="Выберите дату"
								className="w-full"
							/>
						</div>
					</div>

					<div className="space-y-6">
						<Controller
							name="descriptionRu"
							control={control}
							render={({ field }) => (
								<RichTextInput
									label="Описание (RU)"
									value={field.value}
									onChange={field.onChange}
									error={errors.descriptionRu?.message}
								/>
							)}
						/>

						<Controller
							name="descriptionUz"
							control={control}
							render={({ field }) => (
								<RichTextInput
									label="Описание (UZ)"
									value={field.value}
									onChange={field.onChange}
									error={errors.descriptionUz?.message}
								/>
							)}
						/>

						<Controller
							name="pdf"
							control={control}
							render={({ field }) => (
								<PdfUpload value={field.value} onChange={field.onChange} error={errors.pdf?.message as string} className="h-full" />
							)}
						/>
					</div>
				</div>

				<div className="flex justify-end pt-4 border-t border-gray-100">
					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary-gradient text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{isLoading && <Loader2 className="animate-spin w-4 h-4" />}
						{initialData ? "Сохранить изменения" : "Создать новость"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewsCreateForm;
