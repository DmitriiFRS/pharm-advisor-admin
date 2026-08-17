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
	speakerIndex: number;
}

const SpeakerHighlightsFieldArray: React.FC<Props> = ({ control, register, errors, speakerIndex }) => {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: `speakers.${speakerIndex}.highlights`,
		keyName: "fieldKey",
	});
	const highlightErrors = errors.speakers?.[speakerIndex]?.highlights;

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h4 className="text-16 font-semibold text-black-primary">Преимущества спикера</h4>
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
				<div className="rounded-[12px] border border-dashed border-gray-200 bg-gray-50/50 px-5 py-8 text-center text-14 text-gray-500">
					Преимущества пока не добавлены
				</div>
			)}

			{fields.map((field, index) => (
				<div key={field.fieldKey} className="rounded-[12px] border border-gray-200 bg-gray-50/40 p-5 space-y-5">
					<div className="flex items-center justify-between gap-3">
						<h5 className="font-medium text-black-primary">Преимущество {index + 1}</h5>
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
								error={highlightErrors?.[index]?.titleRu}
								title="Заголовок (RU)"
								name={`speakers.${speakerIndex}.highlights.${index}.titleRu`}
								placeholder="Введите заголовок"
							/>
							<CommonTextarea
								register={register}
								error={highlightErrors?.[index]?.descriptionRu}
								title="Описание (RU)"
								name={`speakers.${speakerIndex}.highlights.${index}.descriptionRu`}
								placeholder="Введите описание"
							/>
						</div>
						<div className="space-y-4">
							<CommonInput
								register={register}
								error={highlightErrors?.[index]?.titleUz}
								title="Заголовок (UZ)"
								name={`speakers.${speakerIndex}.highlights.${index}.titleUz`}
								placeholder="Sarlavhani kiriting"
							/>
							<CommonTextarea
								register={register}
								error={highlightErrors?.[index]?.descriptionUz}
								title="Описание (UZ)"
								name={`speakers.${speakerIndex}.highlights.${index}.descriptionUz`}
								placeholder="Tavsifni kiriting"
							/>
						</div>
					</div>
				</div>
			))}

			{typeof highlightErrors?.message === "string" && (
				<p className="text-14 text-red-600">{highlightErrors.message}</p>
			)}
		</div>
	);
};

export default SpeakerHighlightsFieldArray;
