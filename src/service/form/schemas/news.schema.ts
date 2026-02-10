import { z } from "zod";

export const newsSchema = z.object({
	image: z.any().refine((files) => files && (files instanceof File || typeof files === "string" || files.length > 0), {
		message: "Изображение обязательно",
	}),
	titleRu: z.string().min(1, "Введите заголовок на русском"),
	titleUz: z.string().min(1, "Введите заголовок на узбекском"),
	publishedAt: z.string().min(1, "Выберите дату публикации"),
	descriptionRu: z.string().min(2, "Описание на русском должно быть длиннее 2 символов"),
	descriptionUz: z.string().min(2, "Описание на узбекском должно быть длиннее 2 символов"),
	pdf: z
		.union([
			z.instanceof(File),
			z.object({
				id: z.number(),
				url: z.string(),
				fileName: z.string(),
				size: z.number(),
			}),
		])
		.optional()
		.nullable(),
	pdfId: z.number().optional(),
});

export type NewsFormData = z.infer<typeof newsSchema>;

export interface NewsDetail {
	id: number;
	title: string;
	content: string;
	isPublished: boolean;
	publishedAt: Date;
	media: {
		id: number;
		url: string;
		size: number;
		mimeType: string;
		fileName: string;
	};
	translations: {
		id: number;
		locale: string;
		title: string;
		content: string;
	}[];
	pdf?: {
		id: number;
		url: string;
		fileName: string;
		size: number;
	};
}
