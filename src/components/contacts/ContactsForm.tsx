"use client";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsSchema, ContactsFormData } from "@/src/service/form/schemas/contacts.schema";
import { Loader2, Phone, Mail, MapPin, Send, Instagram, Map } from "lucide-react";
import { useState } from "react";

import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";
import { IContact } from "@/src/types/contacts.type";

interface Props {
	initialData?: IContact["data"];
}

const ContactsForm: React.FC<Props> = ({ initialData }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactsFormData>({
		resolver: zodResolver(contactsSchema),
		defaultValues: initialData
			? {
					phone: initialData.phone,
					email: initialData.email,
					telegramLink: initialData.telegramLink || "",
					addressRu: getLocalizedContent(initialData.translations, "ru", "address"),
					addressUz: getLocalizedContent(initialData.translations, "uz", "address"),
					instagramLink: initialData.instagramLink || "",
					googleMapsLink: initialData.googleMapsLink || "",
			  }
			: {
					phone: "",
					email: "",
					telegramLink: "",
					addressRu: "",
					addressUz: "",
					instagramLink: "",
					googleMapsLink: "",
			  },
	});

	const onSubmit = async (data: ContactsFormData) => {
		setIsSubmitting(true);
		try {
			const res = await fetch("/api/patch/contacts", {
				method: "PATCH",
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Ошибка при обновлении контактов");
			}

			toast.success("Контакты успешно обновлены");
		} catch (error: unknown) {
			console.error(error);
			toast.error((error as Error).message || "Ошибка при обновлении контактов");
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputClass = (hasError: boolean) =>
		`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors pl-10 ${
			hasError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-e94190 hover:border-gray-300"
		}`;

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-[800px] mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="text-14 font-medium text-black-primary mb-2 block">Номер телефона</label>
						<div className="relative">
							<Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input {...register("phone")} placeholder="+998 90 123 45 67" className={inputClass(!!errors.phone)} />
						</div>
						{errors.phone && <p className="text-12 text-red-500 mt-1">{errors.phone.message}</p>}
					</div>

					<div>
						<label className="text-14 font-medium text-black-primary mb-2 block">Email</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input {...register("email")} placeholder="info@pharmadvisor.uz" className={inputClass(!!errors.email)} />
						</div>
						{errors.email && <p className="text-12 text-red-500 mt-1">{errors.email.message}</p>}
					</div>

					<div className="md:col-span-1">
						<label className="text-14 font-medium text-black-primary mb-2 block">Адрес (RU)</label>
						<div className="relative">
							<MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
							<textarea
								{...register("addressRu")}
								placeholder="г. Ташкент, ул. Амира Темура, 1"
								rows={3}
								className={`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors pl-10 resize-none ${
									errors.addressRu
										? "border-red-500 focus:border-red-500"
										: "border-gray-200 focus:border-e94190 hover:border-gray-300"
								}`}
							/>
						</div>
						{errors.addressRu && <p className="text-12 text-red-500 mt-1">{errors.addressRu.message}</p>}
					</div>

					<div className="md:col-span-1">
						<label className="text-14 font-medium text-black-primary mb-2 block">Адрес (UZ)</label>
						<div className="relative">
							<MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
							<textarea
								{...register("addressUz")}
								placeholder="Toshkent sh., Amir Temur ko'chasi, 1"
								rows={3}
								className={`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors pl-10 resize-none ${
									errors.addressUz
										? "border-red-500 focus:border-red-500"
										: "border-gray-200 focus:border-e94190 hover:border-gray-300"
								}`}
							/>
						</div>
						{errors.addressUz && <p className="text-12 text-red-500 mt-1">{errors.addressUz.message}</p>}
					</div>

					<div>
						<label className="text-14 font-medium text-black-primary mb-2 block">Telegram</label>
						<div className="relative">
							<Send className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								{...register("telegramLink")}
								placeholder="https://t.me/username"
								className={inputClass(!!errors.telegramLink)}
							/>
						</div>
						{errors.telegramLink && <p className="text-12 text-red-500 mt-1">{errors.telegramLink.message}</p>}
					</div>

					<div>
						<label className="text-14 font-medium text-black-primary mb-2 block">Instagram</label>
						<div className="relative">
							<Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								{...register("instagramLink")}
								placeholder="https://instagram.com/username"
								className={inputClass(!!errors.instagramLink)}
							/>
						</div>
						{errors.instagramLink && <p className="text-12 text-red-500 mt-1">{errors.instagramLink.message}</p>}
					</div>

					<div className="md:col-span-2">
						<label className="text-14 font-medium text-black-primary mb-2 block">Ссылка на Google Карту</label>
						<div className="relative">
							<Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								{...register("googleMapsLink")}
								placeholder="https://maps.google.com/..."
								className={inputClass(!!errors.googleMapsLink)}
							/>
						</div>
						{errors.googleMapsLink && <p className="text-12 text-red-500 mt-1">{errors.googleMapsLink.message}</p>}
					</div>
				</div>

				<div className="flex justify-end pt-4 border-t border-gray-100">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary-gradient text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
						Сохранить изменения
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactsForm;
