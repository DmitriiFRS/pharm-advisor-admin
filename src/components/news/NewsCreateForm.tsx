"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, NewsFormData } from "@/src/service/form/schemas/news.schema";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import RichTextInput from "@/src/components/shared/inputs/RichTextInput";
import SingleDateSelect from "@/src/components/shared/inputs/SingleDateSelect";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const NewsCreateForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<NewsFormData>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			titleRu: "",
			titleUz: "",
			descriptionRu: "",
			descriptionUz: "",
			date: "",
		},
	});

	const onSubmit = async (data: NewsFormData) => {
		setIsSubmitting(true);
		try {
			console.log("Form Data:", data);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			alert("Новость успешно создана (см. консоль)");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
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
							<div>
								<label className="text-14 font-medium text-black-primary mb-2 block">Заголовок (RU)</label>
								<input
									{...register("titleRu")}
									placeholder="Введите заголовок"
									className={`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors 
                                        ${
															errors.titleRu
																? "border-red-500 focus:border-red-500"
																: "border-gray-200 focus:border-e94190 hover:border-gray-300"
														}`}
								/>
								{errors.titleRu && <p className="text-12 text-red-500 mt-1">{errors.titleRu.message}</p>}
							</div>

							<div>
								<label className="text-14 font-medium text-black-primary mb-2 block">Заголовок (UZ)</label>
								<input
									{...register("titleUz")}
									placeholder="Sarlavhani kiriting"
									className={`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors 
                                        ${
															errors.titleUz
																? "border-red-500 focus:border-red-500"
																: "border-gray-200 focus:border-e94190 hover:border-gray-300"
														}`}
								/>
								{errors.titleUz && <p className="text-12 text-red-500 mt-1">{errors.titleUz.message}</p>}
							</div>

							<SingleDateSelect
								name="date"
								setValue={setValue}
								watchedDateValue={watch("date")}
								error={errors.date}
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
					</div>
				</div>

				<div className="flex justify-end pt-4 border-t border-gray-100">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary-gradient text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
						Создать новость
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewsCreateForm;
