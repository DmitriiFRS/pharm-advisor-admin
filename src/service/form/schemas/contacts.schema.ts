import { z } from "zod";

export const contactsSchema = z.object({
	phone: z.string().min(1, "Введите номер телефона"),
	email: z.string().email("Введите корректный email").min(1, "Введите email"),
	telegramLink: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
	addressRu: z.string().min(1, "Введите адрес на русском"),
	addressUz: z.string().min(1, "Введите адрес на узбекском"),
	instagramLink: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
	googleMapsLink: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
});

export type ContactsFormData = z.infer<typeof contactsSchema>;
