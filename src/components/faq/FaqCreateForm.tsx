"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faqSchema, FaqFormData, FaqDetail } from "@/src/service/form/schemas/faq.schema";
import CommonInput from "@/src/components/shared/inputs/CommonInput";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";

interface Props {
	initialData?: FaqDetail;
}

const FaqCreateForm: React.FC<Props> = ({ initialData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FaqFormData>({
		resolver: zodResolver(faqSchema),
		defaultValues: {
			questionRu: getLocalizedContent(initialData?.translations, "ru", "question"),
			questionUz: getLocalizedContent(initialData?.translations, "uz", "question"),
			answerRu: getLocalizedContent(initialData?.translations, "ru", "answer"),
			answerUz: getLocalizedContent(initialData?.translations, "uz", "answer"),
		},
	});

	const onSubmit = async (data: FaqFormData) => {
		try {
			setIsLoading(true);

			const body = {
				questionRu: data.questionRu,
				questionUz: data.questionUz,
				answerRu: data.answerRu,
				answerUz: data.answerUz,
			};

			const url = initialData?.id ? `/api/patch/faqs/${initialData.id}` : "/api/post/faqs";
			const method = initialData?.id ? "PATCH" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Ошибка при сохранении FAQ");
			}

			toast.success(initialData?.id ? "FAQ успешно обновлен" : "FAQ успешно создан");

			router.push("/faq");
			router.refresh();
		} catch (error: unknown) {
			toast.error((error as Error).message || "Ошибка при сохранении FAQ");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-[1200px] mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-6">
						<CommonInput
							register={register}
							error={errors.questionRu}
							title="Вопрос (RU)"
							name="questionRu"
							placeholder="Введите вопрос на русском"
						/>
						<CommonInput
							register={register}
							error={errors.answerRu}
							title="Ответ (RU)"
							name="answerRu"
							placeholder="Введите ответ на русском"
						/>
					</div>
					<div className="space-y-6">
						<CommonInput
							register={register}
							error={errors.questionUz}
							title="Вопрос (UZ)"
							name="questionUz"
							placeholder="Savolni kiriting"
						/>

						<CommonInput
							register={register}
							error={errors.answerUz}
							title="Ответ (UZ)"
							name="answerUz"
							placeholder="Savolni kiriting"
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
						{initialData ? "Сохранить изменения" : "Создать FAQ"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FaqCreateForm;
