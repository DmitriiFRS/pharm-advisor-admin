"use client";

import CommonInput from "@/src/components/shared/inputs/CommonInput";
import CommonTextarea from "@/src/components/shared/inputs/CommonTextarea";
import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";
import {
	OutsourceFaqFormData,
	outsourceFaqSchema,
} from "@/src/outsource/form/schemas/outsource-faq.schema";
import { ApiResponse, OutsourceFaq } from "@/src/outsource/types/outsource.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircleQuestion, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
	initialFaqs: OutsourceFaq[];
	initialError?: string;
}

const emptyValues: OutsourceFaqFormData = {
	questionRu: "",
	questionUz: "",
	answerRu: "",
	answerUz: "",
};

const OutsourceFaqSection: React.FC<Props> = ({ initialFaqs, initialError }) => {
	const [faqs, setFaqs] = useState(initialFaqs);
	const [editingFaq, setEditingFaq] = useState<OutsourceFaq | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const [listError, setListError] = useState(initialError || "");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OutsourceFaqFormData>({
		resolver: zodResolver(outsourceFaqSchema),
		defaultValues: emptyValues,
	});

	const loadFaqs = async () => {
		try {
			setIsListLoading(true);
			setListError("");
			const response = await fetch("/api/get/outsource-faqs?page=1&limit=100", {
				method: "GET",
				cache: "no-store",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || errorData.message || "Не удалось обновить список FAQ");
			}

			const result = (await response.json()) as ApiResponse<OutsourceFaq[]>;
			setFaqs(result.data || []);
		} catch (error: unknown) {
			const message = (error as Error).message || "Не удалось обновить список FAQ";
			setListError(message);
		} finally {
			setIsListLoading(false);
		}
	};

	const cancelEdit = () => {
		setEditingFaq(null);
		reset(emptyValues);
	};

	const startEdit = (faq: OutsourceFaq) => {
		setEditingFaq(faq);
		reset({
			questionRu: getLocalizedContent(faq.translations, "ru", "question") || faq.question || "",
			questionUz: getLocalizedContent(faq.translations, "uz", "question") || "",
			answerRu: getLocalizedContent(faq.translations, "ru", "answer") || faq.answer || "",
			answerUz: getLocalizedContent(faq.translations, "uz", "answer") || "",
		});
	};

	const onSubmit = async (data: OutsourceFaqFormData) => {
		try {
			setIsSubmitting(true);
			const url = editingFaq?.id ? `/api/patch/outsource-faqs/${editingFaq.id}` : "/api/post/outsource-faqs";
			const method = editingFaq?.id ? "PATCH" : "POST";
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || errorData.message || "Ошибка при сохранении FAQ");
			}

			toast.success(editingFaq?.id ? "FAQ аутсорса успешно обновлен" : "FAQ аутсорса успешно создан");
			setEditingFaq(null);
			reset(emptyValues);
			await loadFaqs();
		} catch (error: unknown) {
			toast.error((error as Error).message || "Ошибка при сохранении FAQ");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (faq: OutsourceFaq) => {
		if (!window.confirm("Вы уверены, что хотите удалить этот FAQ?")) return;

		try {
			setDeletingId(faq.id);
			const response = await fetch(`/api/delete/outsource-faqs/${faq.id}`, { method: "DELETE" });

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || errorData.message || "Ошибка при удалении FAQ");
			}

			if (editingFaq?.id === faq.id) {
				cancelEdit();
			}

			toast.success("FAQ аутсорса успешно удален");
			await loadFaqs();
		} catch (error: unknown) {
			toast.error((error as Error).message || "Не удалось удалить FAQ");
		} finally {
			setDeletingId(null);
		}
	};

	return (
		<section className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-8 max-w-[1200px] mx-auto space-y-8">
			<div>
				<h2 className="text-22 font-bold text-black-primary">FAQ страницы «Аутсорс»</h2>
				<p className="text-14 text-gray-500 mt-2">Создание и редактирование вопросов выполняется в форме ниже.</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50/50 p-6 rounded-[12px] space-y-6 border border-gray-100">
				<div className="flex items-center justify-between gap-4">
					<h3 className="text-16 font-semibold text-black-primary">{editingFaq ? "Редактирование FAQ" : "Новый FAQ"}</h3>
					{editingFaq && (
						<button
							type="button"
							onClick={cancelEdit}
							className="inline-flex items-center gap-2 text-14 text-gray-500 hover:text-black-primary transition-colors"
						>
							<X className="w-4 h-4" />
							Отменить
						</button>
					)}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-4">
						<CommonInput
							register={register}
							error={errors.questionRu}
							title="Вопрос (RU)"
							name="questionRu"
							placeholder="Введите вопрос на русском"
						/>
						<CommonTextarea
							register={register}
							error={errors.answerRu}
							title="Ответ (RU)"
							name="answerRu"
							placeholder="Введите ответ на русском"
						/>
					</div>
					<div className="space-y-4">
						<CommonInput
							register={register}
							error={errors.questionUz}
							title="Вопрос (UZ)"
							name="questionUz"
							placeholder="Savolni kiriting"
						/>
						<CommonTextarea
							register={register}
							error={errors.answerUz}
							title="Ответ (UZ)"
							name="answerUz"
							placeholder="Javobni kiriting"
						/>
					</div>
				</div>
				<div className="flex justify-end pt-4 border-t border-gray-100">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary-gradient text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
					>
						{isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
						{editingFaq ? "Сохранить FAQ" : "Добавить FAQ"}
					</button>
				</div>
			</form>

			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<h3 className="text-18 font-semibold text-black-primary">Список FAQ</h3>
					<span className="text-13 text-gray-500">Всего: {faqs.length}</span>
				</div>

				{listError && (
					<div className="rounded-[12px] border border-red-200 bg-red-50 px-5 py-4 text-14 text-red-700">
						<p>{listError}</p>
						<button type="button" onClick={loadFaqs} className="font-medium underline mt-2">
							Повторить загрузку
						</button>
					</div>
				)}

				{isListLoading ? (
					<div className="space-y-3" aria-label="Загрузка FAQ">
						{[0, 1, 2].map((item) => (
							<div key={item} className="h-24 rounded-[12px] bg-gray-100 animate-pulse" />
						))}
					</div>
				) : faqs.length === 0 && !listError ? (
					<div className="rounded-[12px] border border-dashed border-gray-200 px-6 py-12 text-center">
						<MessageCircleQuestion className="w-9 h-9 text-gray-300 mx-auto" />
						<p className="text-14 font-medium text-black-primary mt-3">FAQ пока не добавлены</p>
						<p className="text-13 text-gray-500 mt-1">Заполните форму выше, чтобы создать первый вопрос.</p>
					</div>
				) : (
					<div className="space-y-3">
						{faqs.map((faq) => {
							const question = getLocalizedContent(faq.translations, "ru", "question") || faq.question;
							const answer = getLocalizedContent(faq.translations, "ru", "answer") || faq.answer;

							return (
								<div key={faq.id} className="rounded-[12px] border border-gray-200 p-5 flex gap-5 justify-between">
									<div className="min-w-0">
										<h4 className="font-medium text-black-primary break-words">{question}</h4>
										<p className="text-14 text-gray-600 mt-2 whitespace-pre-wrap break-words">{answer}</p>
									</div>
									<div className="flex items-start gap-2 shrink-0">
										<button
											type="button"
											onClick={() => startEdit(faq)}
											className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black-primary hover:bg-gray-50 transition-colors"
											aria-label="Редактировать FAQ"
											title="Редактировать"
										>
											<Pencil className="w-4 h-4" />
										</button>
										<button
											type="button"
											onClick={() => handleDelete(faq)}
											disabled={deletingId === faq.id}
											className="p-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 disabled:opacity-50 transition-colors"
											aria-label="Удалить FAQ"
											title="Удалить"
										>
											{deletingId === faq.id ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Trash2 className="w-4 h-4" />
											)}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default OutsourceFaqSection;
