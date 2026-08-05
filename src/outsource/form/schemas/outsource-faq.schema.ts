import { z } from "zod";

export const outsourceFaqSchema = z.object({
	questionRu: z.string().trim().min(1, "Введите вопрос на русском"),
	questionUz: z.string().trim().min(1, "Введите вопрос на узбекском"),
	answerRu: z.string().trim().min(1, "Введите ответ на русском"),
	answerUz: z.string().trim().min(1, "Введите ответ на узбекском"),
});

export type OutsourceFaqFormData = z.infer<typeof outsourceFaqSchema>;
