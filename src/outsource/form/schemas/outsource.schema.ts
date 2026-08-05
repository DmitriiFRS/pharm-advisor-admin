import { z } from "zod";

const requiredText = (message: string) => z.string().trim().min(1, message);

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

export const outsourceSchema = z.object({
	startsAt: requiredText("Укажите дату и время начала").refine((value) => !Number.isNaN(new Date(value).getTime()), {
		message: "Укажите корректную дату и время",
	}),
	heroTitleRu: requiredText("Введите заголовок Hero на русском"),
	heroTitleUz: requiredText("Введите заголовок Hero на узбекском"),
	programTitleRu: requiredText("Введите заголовок программы на русском"),
	programTitleUz: requiredText("Введите заголовок программы на узбекском"),
	speakerNameRu: requiredText("Введите имя спикера на русском"),
	speakerNameUz: requiredText("Введите имя спикера на узбекском"),
	speakerRoleRu: requiredText("Введите роль спикера на русском"),
	speakerRoleUz: requiredText("Введите роль спикера на узбекском"),
	speakerHeadlineRu: requiredText("Введите заголовок блока спикера на русском"),
	speakerHeadlineUz: requiredText("Введите заголовок блока спикера на узбекском"),
	speakerDescriptionRu: requiredText("Введите описание спикера на русском"),
	speakerDescriptionUz: requiredText("Введите описание спикера на узбекском"),
	programImage: imageSchema,
	speakerImage: imageSchema,
	heroCards: z.array(heroCardSchema).max(2, "Можно добавить не более 2 Hero-карточек"),
	programItems: z.array(programItemSchema).max(3, "Можно добавить не более 3 пунктов программы"),
	speakerHighlights: z.array(speakerHighlightSchema).max(3, "Можно добавить не более 3 преимуществ спикера"),
});

export type OutsourceFormData = z.infer<typeof outsourceSchema>;
