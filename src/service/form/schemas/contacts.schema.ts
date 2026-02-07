import { z } from "zod";

export const contactsSchema = z.object({
	phone: z.string().min(1, "Введите номер телефона"),
	email: z.string().email("Введите корректный email").min(1, "Введите email"),
	telegram: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
	address: z.string().min(1, "Введите адрес"),
	instagram: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
	googleMaps: z.string().url("Введите корректную ссылку").optional().or(z.literal("")),
});

export type ContactsFormData = z.infer<typeof contactsSchema>;
