"use client";

import CommonInput from "@/src/components/shared/inputs/CommonInput";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import { OutsourceFormData } from "@/src/outsource/form/schemas/outsource.schema";
import { Plus } from "lucide-react";
import { Control, Controller, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import FieldArrayControls from "./FieldArrayControls";

interface Props {
	control: Control<OutsourceFormData>;
	register: UseFormRegister<OutsourceFormData>;
	errors: FieldErrors<OutsourceFormData>;
}

const HeroCardsFieldArray: React.FC<Props> = ({ control, register, errors }) => {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: "heroCards",
		keyName: "fieldKey",
	});

	const canAdd = fields.length < 2;

	return (
		<div className="bg-gray-50/50 p-6 rounded-[12px] space-y-4 border border-gray-100">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h2 className="text-18 font-semibold text-black-primary">Hero-карточки</h2>
					<p className="text-13 text-gray-500 mt-1">До 2 карточек. Порядок меняется кнопками со стрелками.</p>
				</div>
				<button
					type="button"
					disabled={!canAdd}
					onClick={() =>
						append({
							titleRu: "",
							titleUz: "",
							subtitleRu: "",
							subtitleUz: "",
							order: fields.length,
							iconId: null,
							icon: null,
						})
					}
					className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-14 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<Plus className="w-4 h-4" />
					Добавить карточку
				</button>
			</div>

			{fields.length === 0 && (
				<div className="rounded-[12px] border border-dashed border-gray-200 bg-white px-5 py-8 text-center text-14 text-gray-500">
					Hero-карточки пока не добавлены
				</div>
			)}

			{fields.map((field, index) => (
				<div key={field.fieldKey} className="rounded-[12px] border border-gray-200 bg-white p-5 space-y-5">
					<div className="flex items-center justify-between gap-3">
						<h3 className="font-medium text-black-primary">Карточка {index + 1}</h3>
						<FieldArrayControls
							index={index}
							count={fields.length}
							onMove={move}
							onRemove={remove}
							removeLabel="Удалить Hero-карточку"
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="space-y-4">
							<h4 className="text-14 font-medium text-gray-600">Русский</h4>
							<CommonInput
								register={register}
								error={errors.heroCards?.[index]?.titleRu}
								title="Заголовок (RU)"
								name={`heroCards.${index}.titleRu`}
								placeholder="Введите заголовок"
							/>
							<CommonInput
								register={register}
								error={errors.heroCards?.[index]?.subtitleRu}
								title="Подзаголовок (RU)"
								name={`heroCards.${index}.subtitleRu`}
								placeholder="Введите подзаголовок"
							/>
						</div>
						<div className="space-y-4">
							<h4 className="text-14 font-medium text-gray-600">O‘zbekcha</h4>
							<CommonInput
								register={register}
								error={errors.heroCards?.[index]?.titleUz}
								title="Заголовок (UZ)"
								name={`heroCards.${index}.titleUz`}
								placeholder="Sarlavhani kiriting"
							/>
							<CommonInput
								register={register}
								error={errors.heroCards?.[index]?.subtitleUz}
								title="Подзаголовок (UZ)"
								name={`heroCards.${index}.subtitleUz`}
								placeholder="Kichik sarlavhani kiriting"
							/>
						</div>
					</div>

					<div>
						<p className="text-14 font-medium text-black-primary mb-2">Иконка</p>
						<Controller
							name={`heroCards.${index}.icon`}
							control={control}
							render={({ field: iconField }) => (
								<ImageUpload
									value={iconField.value}
									onChange={iconField.onChange}
									error={errors.heroCards?.[index]?.icon?.message}
								/>
							)}
						/>
					</div>
				</div>
			))}

			{typeof errors.heroCards?.message === "string" && <p className="text-14 text-red-600">{errors.heroCards.message}</p>}
		</div>
	);
};

export default HeroCardsFieldArray;
