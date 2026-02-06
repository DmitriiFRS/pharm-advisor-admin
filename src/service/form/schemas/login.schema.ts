import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Введите корректный email").min(1, "Обязательное поле"),
	password: z.string().min(6, "Пароль должен содержать минимум 6 символов").min(1, "Обязательное поле"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
