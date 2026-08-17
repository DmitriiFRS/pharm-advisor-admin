"use client";

import CommonInput from "@/src/components/shared/inputs/CommonInput";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";
import HeroCardsFieldArray from "@/src/outsource/form/components/HeroCardsFieldArray";
import ProgramItemsFieldArray from "@/src/outsource/form/components/ProgramItemsFieldArray";
import SpeakersFieldArray from "@/src/outsource/form/components/SpeakersFieldArray";
import { OutsourceFormData, outsourceSchema } from "@/src/outsource/form/schemas/outsource.schema";
import { OutsourceDetail } from "@/src/outsource/types/outsource.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
	initialData?: OutsourceDetail;
}

const toDatetimeLocal = (value?: string) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
	return localDate.toISOString().slice(0, 16);
};

const emptySpeaker: OutsourceFormData["speakers"][number] = {
	nameRu: "",
	nameUz: "",
	roleRu: "",
	roleUz: "",
	headlineRu: "",
	headlineUz: "",
	descriptionRu: "",
	descriptionUz: "",
	order: 0,
	imageId: null,
	image: null,
	highlights: [],
};

const getDefaultValues = (initialData?: OutsourceDetail): OutsourceFormData => ({
	startsAt: toDatetimeLocal(initialData?.startsAt),
	heroTitleRu: getLocalizedContent(initialData?.translations, "ru", "heroTitle") || initialData?.heroTitle || "",
	heroTitleUz: getLocalizedContent(initialData?.translations, "uz", "heroTitle") || "",
	programTitleRu: getLocalizedContent(initialData?.translations, "ru", "programTitle") || initialData?.programTitle || "",
	programTitleUz: getLocalizedContent(initialData?.translations, "uz", "programTitle") || "",
	programImage: initialData?.programImage?.url || null,
	heroCards: [...(initialData?.heroCards || [])]
		.sort((a, b) => a.order - b.order)
		.map((card) => ({
			id: card.id,
			titleRu: getLocalizedContent(card.translations, "ru", "title") || card.title || "",
			titleUz: getLocalizedContent(card.translations, "uz", "title") || "",
			subtitleRu: getLocalizedContent(card.translations, "ru", "subtitle") || card.subtitle || "",
			subtitleUz: getLocalizedContent(card.translations, "uz", "subtitle") || "",
			order: card.order,
			iconId: card.iconId,
			icon: card.icon?.url || null,
		})),
	programItems: [...(initialData?.programItems || [])]
		.sort((a, b) => a.order - b.order)
		.map((item) => ({
			id: item.id,
			titleRu: getLocalizedContent(item.translations, "ru", "title") || item.title || "",
			titleUz: getLocalizedContent(item.translations, "uz", "title") || "",
			descriptionRu: getLocalizedContent(item.translations, "ru", "description") || item.description || "",
			descriptionUz: getLocalizedContent(item.translations, "uz", "description") || "",
			order: item.order,
		})),
	speakers: initialData?.speakers?.length
		? [...initialData.speakers]
				.sort((a, b) => a.order - b.order)
				.map((speaker) => ({
					id: speaker.id,
					nameRu: getLocalizedContent(speaker.translations, "ru", "name") || speaker.name || "",
					nameUz: getLocalizedContent(speaker.translations, "uz", "name") || "",
					roleRu: getLocalizedContent(speaker.translations, "ru", "role") || speaker.role || "",
					roleUz: getLocalizedContent(speaker.translations, "uz", "role") || "",
					headlineRu: getLocalizedContent(speaker.translations, "ru", "headline") || speaker.headline || "",
					headlineUz: getLocalizedContent(speaker.translations, "uz", "headline") || "",
					descriptionRu:
						getLocalizedContent(speaker.translations, "ru", "description") || speaker.description || "",
					descriptionUz: getLocalizedContent(speaker.translations, "uz", "description") || "",
					order: speaker.order,
					imageId: speaker.imageId,
					image: speaker.image?.url || null,
					highlights: [...(speaker.highlights || [])]
						.sort((a, b) => a.order - b.order)
						.map((highlight) => ({
							id: highlight.id,
							titleRu: getLocalizedContent(highlight.translations, "ru", "title") || highlight.title || "",
							titleUz: getLocalizedContent(highlight.translations, "uz", "title") || "",
							descriptionRu:
								getLocalizedContent(highlight.translations, "ru", "description") || highlight.description || "",
							descriptionUz: getLocalizedContent(highlight.translations, "uz", "description") || "",
							order: highlight.order,
						})),
				}))
		: [{ ...emptySpeaker }],
});

const OutsourceForm: React.FC<Props> = ({ initialData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<OutsourceFormData>({
		resolver: zodResolver(outsourceSchema),
		defaultValues: getDefaultValues(initialData),
	});

	useEffect(() => {
		reset(getDefaultValues(initialData));
	}, [initialData, reset]);

	const onSubmit = async (data: OutsourceFormData) => {
		try {
			setIsLoading(true);
			const formData = new FormData();

			formData.append("startsAt", new Date(data.startsAt).toISOString());
			formData.append("heroTitleRu", data.heroTitleRu);
			formData.append("heroTitleUz", data.heroTitleUz);
			formData.append("programTitleRu", data.programTitleRu);
			formData.append("programTitleUz", data.programTitleUz);

			if (data.programImage instanceof File) {
				formData.append("programImage", data.programImage);
			}

			if (initialData?.programImageId !== null && initialData?.programImageId !== undefined) {
				if (data.programImage === null) {
					formData.append("programImageId", "null");
				} else if (!(data.programImage instanceof File)) {
					formData.append("programImageId", String(initialData.programImageId));
				}
			}

			const normalizedHeroCards = data.heroCards.map((card, index) => {
				if (card.icon instanceof File) {
					formData.append(`heroIcon${index}`, card.icon);
				}

				return {
					titleRu: card.titleRu,
					titleUz: card.titleUz,
					subtitleRu: card.subtitleRu,
					subtitleUz: card.subtitleUz,
					order: index,
					iconId:
						card.icon instanceof File ? (card.iconId ?? null) : card.icon === null ? null : (card.iconId ?? null),
				};
			});

			formData.append("heroCards", JSON.stringify(normalizedHeroCards));
			formData.append(
				"programItems",
				JSON.stringify(
					data.programItems.map((item, index) => ({
						titleRu: item.titleRu,
						titleUz: item.titleUz,
						descriptionRu: item.descriptionRu,
						descriptionUz: item.descriptionUz,
						order: index,
					}))
				)
			);

			const normalizedSpeakers = data.speakers.map((speaker, speakerIndex) => {
				if (speaker.image instanceof File) {
					formData.append(`speakerImage${speakerIndex}`, speaker.image);
				}

				return {
					nameRu: speaker.nameRu,
					nameUz: speaker.nameUz,
					roleRu: speaker.roleRu,
					roleUz: speaker.roleUz,
					headlineRu: speaker.headlineRu,
					headlineUz: speaker.headlineUz,
					descriptionRu: speaker.descriptionRu,
					descriptionUz: speaker.descriptionUz,
					order: speakerIndex,
					imageId:
						speaker.image instanceof File
							? (speaker.imageId ?? null)
							: speaker.image === null
								? null
								: (speaker.imageId ?? null),
					highlights: speaker.highlights.map((highlight, highlightIndex) => ({
						titleRu: highlight.titleRu,
						titleUz: highlight.titleUz,
						descriptionRu: highlight.descriptionRu,
						descriptionUz: highlight.descriptionUz,
						order: highlightIndex,
					})),
				};
			});

			formData.append("speakers", JSON.stringify(normalizedSpeakers));

			const url = initialData?.id ? `/api/patch/outsource/${initialData.id}` : "/api/post/outsource";
			const method = initialData?.id ? "PATCH" : "POST";
			const response = await fetch(url, { method, body: formData });

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || errorData.message || "Ошибка при сохранении");
			}

			toast.success(initialData?.id ? "Страница аутсорса успешно обновлена" : "Страница аутсорса успешно создана");
			router.refresh();
		} catch (error: unknown) {
			toast.error((error as Error).message || "Ошибка при сохранении");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-8 max-w-[1200px] mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-5 border border-gray-100">
					<div>
						<h2 className="text-18 font-semibold text-black-primary">Hero и дата начала</h2>
						<p className="text-13 text-gray-500 mt-1">Основной заголовок страницы и локальное время публикации.</p>
					</div>
					<CommonInput
						register={register}
						error={errors.startsAt}
						title="Дата и время начала"
						name="startsAt"
						type="datetime-local"
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<CommonInput
							register={register}
							error={errors.heroTitleRu}
							title="Заголовок Hero (RU)"
							name="heroTitleRu"
							placeholder="Введите заголовок"
						/>
						<CommonInput
							register={register}
							error={errors.heroTitleUz}
							title="Заголовок Hero (UZ)"
							name="heroTitleUz"
							placeholder="Sarlavhani kiriting"
						/>
					</div>
				</div>

				<HeroCardsFieldArray control={control} register={register} errors={errors} />

				<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-6 border border-gray-100">
					<div>
						<h2 className="text-18 font-semibold text-black-primary">Программа аутсорса</h2>
						<p className="text-13 text-gray-500 mt-1">Заголовок, изображение и пункты программы.</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<CommonInput
							register={register}
							error={errors.programTitleRu}
							title="Заголовок программы (RU)"
							name="programTitleRu"
							placeholder="Введите заголовок"
						/>
						<CommonInput
							register={register}
							error={errors.programTitleUz}
							title="Заголовок программы (UZ)"
							name="programTitleUz"
							placeholder="Sarlavhani kiriting"
						/>
					</div>
					<div>
						<p className="text-14 font-medium text-black-primary mb-2">Изображение программы</p>
						<Controller
							name="programImage"
							control={control}
							render={({ field }) => (
								<ImageUpload value={field.value} onChange={field.onChange} error={errors.programImage?.message} />
							)}
						/>
					</div>
					<ProgramItemsFieldArray control={control} register={register} errors={errors} />
				</div>

				<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-6 border border-gray-100">
					<div>
						<h2 className="text-18 font-semibold text-black-primary">Спикеры</h2>
					</div>
					<SpeakersFieldArray control={control} register={register} errors={errors} />
				</div>

				<div className="flex justify-end pt-6 border-t border-gray-100">
					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary-gradient text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{isLoading && <Loader2 className="animate-spin w-4 h-4" />}
						{initialData?.id ? "Сохранить изменения" : "Создать страницу"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default OutsourceForm;
