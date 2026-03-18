"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceFormData } from "@/src/service/form/schemas/service.schema";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import CommonInput from "@/src/components/shared/inputs/CommonInput";
import DynamicStringList from "@/src/components/shared/inputs/DynamicStringList";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ServiceDetail } from "@/src/service/form/schemas/service.schema";
import { getLocalizedContent } from "@/src/helpers/getLocalizedContent";

interface Props {
	initialData?: ServiceDetail;
}

const ServiceCreateForm: React.FC<Props> = ({ initialData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ServiceFormData>({
		resolver: zodResolver(serviceSchema),
		defaultValues: {
			nameRu: getLocalizedContent(initialData?.translations, "ru", "name") || "",
			nameUz: getLocalizedContent(initialData?.translations, "uz", "name") || "",
			descriptionRu: getLocalizedContent(initialData?.translations, "ru", "description") || "",
			descriptionUz: getLocalizedContent(initialData?.translations, "uz", "description") || "",
			labelRu: getLocalizedContent(initialData?.translations, "ru", "label") || "",
			labelUz: getLocalizedContent(initialData?.translations, "uz", "label") || "",
			price: initialData?.price || undefined,
			serviceFeaturesRu: initialData?.translations?.find((t) => t.locale === "ru")?.serviceFeatures || [""],
			serviceFeaturesUz: initialData?.translations?.find((t) => t.locale === "uz")?.serviceFeatures || [""],
			image: initialData?.media?.url || null,
		},
	});

	const onSubmit = async (data: ServiceFormData) => {
		try {
			setIsLoading(true);

			const formData = new FormData();
			formData.append("nameRu", data.nameRu);
			formData.append("nameUz", data.nameUz);
			formData.append("descriptionRu", data.descriptionRu);
			formData.append("descriptionUz", data.descriptionUz);
			formData.append("labelRu", data.labelRu);
			formData.append("labelUz", data.labelUz);

			if (data.price !== undefined && data.price !== "") {
				formData.append("price", String(data.price));
			}

			data.serviceFeaturesRu.forEach((item) => {
				if (item.trim()) formData.append("serviceFeaturesRu[]", item);
			});
			data.serviceFeaturesUz.forEach((item) => {
				if (item.trim()) formData.append("serviceFeaturesUz[]", item);
			});

			if (data.image instanceof File) {
				formData.append("image", data.image);
			}

			if ((data.image instanceof File || data.image === null) && initialData?.media?.id) {
				formData.append("imageId", String(initialData.media.id));
			}

			const url = initialData?.id ? `/api/patch/services/${initialData.id}` : "/api/post/services";
			const method = initialData?.id ? "PATCH" : "POST";
			console.log(formData);
			const response = await fetch(url, {
				method,
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || "Ошибка при сохранении услуги");
			}

			toast.success(initialData?.id ? "Услуга успешно обновлена" : "Услуга успешно создана");

			if (!initialData?.id) {
				reset();
			} else {
				router.push("/services");
				router.refresh();
			}
		} catch (error: unknown) {
			toast.error((error as Error).message || "Ошибка при сохранении");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-8 max-w-[1200px] mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-6">
						<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-4 border border-gray-100">
							<h3 className="font-medium text-16 text-black-primary mb-2">Основная информация (RU)</h3>
							<CommonInput
								register={register}
								error={errors.nameRu}
								title="Название (RU)"
								name="nameRu"
								placeholder="Введите название"
							/>
							<CommonInput
								register={register}
								error={errors.labelRu}
								title="Подпись/Лейбл (RU)"
								name="labelRu"
								placeholder="Например: популярное"
							/>
							<CommonInput
								register={register}
								error={errors.descriptionRu}
								title="Описание (RU)"
								name="descriptionRu"
								placeholder="Краткое описание"
							/>
							<div className="pt-2">
								<DynamicStringList
									control={control}
									register={register}
									name="serviceFeaturesRu"
									title="Преимущества / Особенности (RU)"
									placeholder="Введите особенность"
									error={errors.serviceFeaturesRu}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-4 border border-gray-100">
							<h3 className="font-medium text-16 text-black-primary mb-2">Основная информация (UZ)</h3>
							<CommonInput
								register={register}
								error={errors.nameUz}
								title="Название (UZ)"
								name="nameUz"
								placeholder="Sarlavhani kiriting"
							/>
							<CommonInput
								register={register}
								error={errors.labelUz}
								title="Подпись/Лейбл (UZ)"
								name="labelUz"
								placeholder="Masalan: mashhur"
							/>
							<CommonInput
								register={register}
								error={errors.descriptionUz}
								title="Описание (UZ)"
								name="descriptionUz"
								placeholder="Qisqacha tavsifi"
							/>
							<div className="pt-2">
								<DynamicStringList
									control={control}
									register={register}
									name="serviceFeaturesUz"
									title="Преимущества / Особенности (UZ)"
									placeholder="Xususiyatni kiriting"
									error={errors.serviceFeaturesUz}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<CommonInput register={register} error={errors.price} title="Цена" name="price" type="number" placeholder="Не указана" />
					<Controller
						name="image"
						control={control}
						render={({ field }) => (
							<ImageUpload value={field.value} onChange={field.onChange} error={errors.image?.message as string} />
						)}
					/>
				</div>
				<div className="flex justify-end pt-6 border-t border-gray-100">
					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary-gradient text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{isLoading && <Loader2 className="animate-spin w-4 h-4" />}
						{initialData ? "Сохранить изменения" : "Создать услугу"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ServiceCreateForm;
