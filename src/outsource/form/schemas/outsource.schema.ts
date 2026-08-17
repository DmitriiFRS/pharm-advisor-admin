import { z } from "zod";

const requiredText = (message: string) => z.string().trim().min(1, message);

const hasRichTextContent = (value: string) =>
	value
		.replace(/<br\s*\/?\s*>/gi, "")
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;|&#160;|&#x0*a0;/gi, " ")
		.replace(/[\s\u200B-\u200D\uFEFF]/g, "").length > 0;

const requiredRichText = (message: string) => z.string().refine(hasRichTextContent, { message });

const fileSchema = z.custom<File>((value) => typeof File !== "undefined" && value instanceof File, {
	message: "Неверный формат изображения",
});

const imageSchema = z.union([fileSchema, z.string(), z.null()]);

const heroCardSchema = z.object({
	id: z.number().optional(),
	titleRu: requiredText("Введите заголовок карточки на русском"),
	titleUz: requiredText("Введите заголовок карточки на узбекском"),
	subtitleRu: requiredText("Введите подзаголовок карточки на русском"),
	subtitleUz: requiredText("Введите подзаголовок карточки на узбекском"),
	order: z.number().int().nonnegative(),
	iconId: z.number().nullable().optional(),
	icon: imageSchema,
});

const programItemSchema = z.object({
	id: z.number().optional(),
	titleRu: requiredText("Введите заголовок пункта программы на русском"),
	titleUz: requiredText("Введите заголовок пункта программы на узбекском"),
	descriptionRu: requiredText("Введите описание пункта программы на русском"),
	descriptionUz: requiredText("Введите описание пункта программы на узбекском"),
	order: z.number().int().nonnegative(),
});

const speakerHighlightSchema = z.object({
	id: z.number().optional(),
	titleRu: requiredText("Введите заголовок преимущества на русском"),
	titleUz: requiredText("Введите заголовок преимущества на узбекском"),
	descriptionRu: requiredText("Введите описание преимущества на русском"),
	descriptionUz: requiredText("Введите описание преимущества на узбекском"),
	order: z.number().int().nonnegative(),
});

const speakerSchema = z.object({
	id: z.number().optional(),
	nameRu: requiredText("Введите имя спикера на русском"),
	nameUz: requiredText("Введите имя спикера на узбекском"),
	roleRu: requiredText("Введите роль спикера на русском"),
	roleUz: requiredText("Введите роль спикера на узбекском"),
	headlineRu: requiredRichText("Введите заголовок блока спикера на русском"),
	headlineUz: requiredRichText("Введите заголовок блока спикера на узбекском"),
	descriptionRu: requiredRichText("Введите описание спикера на русском"),
	descriptionUz: requiredRichText("Введите описание спикера на узбекском"),
	order: z.number().int().nonnegative(),
	imageId: z.number().nullable().optional(),
	image: imageSchema,
	highlights: z.array(speakerHighlightSchema).max(3, "Можно добавить не более 3 преимуществ спикера"),
});

export const outsourceSchema = z.object({
	startsAt: requiredText("Укажите дату и время начала").refine((value) => !Number.isNaN(new Date(value).getTime()), {
		message: "Укажите корректную дату и время",
	}),
	heroTitleRu: requiredText("Введите заголовок Hero на русском"),
	heroTitleUz: requiredText("Введите заголовок Hero на узбекском"),
	programTitleRu: requiredText("Введите заголовок программы на русском"),
	programTitleUz: requiredText("Введите заголовок программы на узбекском"),
	programImage: imageSchema,
	heroCards: z.array(heroCardSchema).max(2, "Можно добавить не более 2 Hero-карточек"),
	programItems: z.array(programItemSchema).max(3, "Можно добавить не более 3 пунктов программы"),
	speakers: z.array(speakerSchema).min(1, "Добавьте хотя бы одного спикера"),
});

export type OutsourceFormData = z.infer<typeof outsourceSchema>;
