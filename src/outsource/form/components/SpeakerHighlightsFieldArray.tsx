"use client";

import CommonInput from "@/src/components/shared/inputs/CommonInput";
import CommonTextarea from "@/src/components/shared/inputs/CommonTextarea";
import { OutsourceFormData } from "@/src/outsource/form/schemas/outsource.schema";
import { Plus } from "lucide-react";
import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import FieldArrayControls from "./FieldArrayControls";

interface Props {
	control: Control<OutsourceFormData>;
	register: UseFormRegister<OutsourceFormData>;
	errors: FieldErrors<OutsourceFormData>;
}

const SpeakerHighlightsFieldArray: React.FC<Props> = ({ control, register, errors }) => {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: "speakerHighlights",
		keyName: "fieldKey",
	});

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h3 className="text-16 font-semibold text-black-primary">Преимущества спикера</h3>
					<p className="text-13 text-gray-500 mt-1">Можно добавить не более 3 преимуществ.</p>
				</div>
				<button
					type="button"
					disabled={fields.length >= 3}
					onClick={() =>
						append({
							titleRu: "",
							titleUz: "",
							descriptionRu: "",
							descriptionUz: "",
							order: fields.length,
						})
					}
					className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-14 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<Plus className="w-4 h-4" />
					Добавить преимущество
				</button>
			</div>

			{fields.length === 0 && (
				<div className="rounded-[12px] border border-dashed border-gray-200 bg-white px-5 py-8 text-center text-14 text-gray-500">
					Преимущества пока не добавлены
				</div>
			)}

			{fields.map((field, index) => (
				<div key={field.fieldKey} className="rounded-[12px] border border-gray-200 bg-white p-5 space-y-5">
					<div className="flex items-center justify-between gap-3">
						<h4 className="font-medium text-black-primary">Преимущество {index + 1}</h4>
						<FieldArrayControls
							index={index}
							count={fields.length}
							onMove={move}
							onRemove={remove}
							removeLabel="Удалить преимущество"
						/>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="space-y-4">
							<CommonInput
								register={register}
								error={errors.speakerHighlights?.[index]?.titleRu}
								title="Заголовок (RU)"
								name={`speakerHighlights.${index}.titleRu`}
								placeholder="Введите заголовок"
							/>
							<CommonTextarea
								register={register}
								error={errors.speakerHighlights?.[index]?.descriptionRu}
								title="Описание (RU)"
								name={`speakerHighlights.${index}.descriptionRu`}
								placeholder="Введите описание"
							/>
						</div>
						<div className="space-y-4">
							<CommonInput
								register={register}
								error={errors.speakerHighlights?.[index]?.titleUz}
								title="Заголовок (UZ)"
								name={`speakerHighlights.${index}.titleUz`}
								placeholder="Sarlavhani kiriting"
							/>
							<CommonTextarea
								register={register}
								error={errors.speakerHighlights?.[index]?.descriptionUz}
								title="Описание (UZ)"
								name={`speakerHighlights.${index}.descriptionUz`}
								placeholder="Tavsifni kiriting"
							/>
						</div>
					</div>
				</div>
			))}

			{typeof errors.speakerHighlights?.message === "string" && (
				<p className="text-14 text-red-600">{errors.speakerHighlights.message}</p>
			)}
		</div>
	);
};

export default SpeakerHighlightsFieldArray;
