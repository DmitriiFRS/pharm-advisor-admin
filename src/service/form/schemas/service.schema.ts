import { z } from "zod";

export const serviceSchema = z.object({
	image: z
		.any()
		.refine((files) => !files || files instanceof File || typeof files === "string" || files.length > 0, {
			message: "Неверный формат изображения",
		})
		.optional()
		.nullable(),
	nameRu: z.string().min(1, "Введите название на русском"),
	nameUz: z.string().min(1, "Введите название на узбекском"),
	descriptionRu: z.string().min(2, "Описание на русском должно быть длиннее 2 символов"),
	descriptionUz: z.string().min(2, "Описание на узбекском должно быть длиннее 2 символов"),
	labelRu: z.string().min(1, "Введите подпись на русском"),
	labelUz: z.string().min(1, "Введите подпись на узбекском"),
	price: z.union([z.string().min(1, "Укажите цену"), z.number()], { message: "Укажите цену" }),
	order: z.union([z.string(), z.number()]).optional().nullable(),
	serviceFeaturesRu: z.array(z.string().min(1, "Пункт не может быть пустым")).min(1, "Добавьте хотя бы один пункт на русском"),
	serviceFeaturesUz: z.array(z.string().min(1, "Пункт не может быть пустым")).min(1, "Добавьте хотя бы один пункт на узбекском"),
	imageId: z.number().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export interface ServiceDetail {
	id: number;
	name: string;
	price: number;
	order: number;
	label: string;
	description: string;
	serviceFeatures: string[];
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
		name: string;
		title: string;
		label: string;
		description: string;
		serviceFeatures: string[];
	}[];
}
