import { z } from "zod";

export const faqSchema = z.object({
	questionRu: z.string().min(1, "Введите вопрос на русском"),
	questionUz: z.string().min(1, "Введите вопрос на узбекском"),
	answerRu: z.string().min(2, "Ответ на русском должен быть длиннее 2 символов"),
	answerUz: z.string().min(2, "Ответ на узбекском должен быть длиннее 2 символов"),
});

export type FaqFormData = z.infer<typeof faqSchema>;

export interface FaqDetail {
	id: number;
	translations: {
		id: number;
		locale: string;
		question: string;
		answer: string;
	}[];
	createdAt: string;
	updatedAt: string;
}
