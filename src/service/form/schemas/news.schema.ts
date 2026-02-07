import { z } from "zod";

export const newsSchema = z.object({
	image: z.any().refine((files) => files && (files instanceof File || typeof files === "string" || files.length > 0), {
		message: "Изображение обязательно",
	}),
	titleRu: z.string().min(1, "Введите заголовок на русском"),
	titleUz: z.string().min(1, "Введите заголовок на узбекском"),
	date: z.string().min(1, "Выберите дату публикации"),
	descriptionRu: z.string().min(10, "Описание на русском должно быть длиннее 10 символов"),
	descriptionUz: z.string().min(10, "Описание на узбекском должно быть длиннее 10 символов"),
});

export type NewsFormData = z.infer<typeof newsSchema>;
