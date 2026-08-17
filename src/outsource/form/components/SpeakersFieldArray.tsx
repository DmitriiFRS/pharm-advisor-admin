"use client";

import CommonInput from "@/src/components/shared/inputs/CommonInput";
import ImageUpload from "@/src/components/shared/inputs/ImageUpload";
import RichTextInput from "@/src/components/shared/inputs/RichTextInput";
import { OutsourceFormData } from "@/src/outsource/form/schemas/outsource.schema";
import { Plus } from "lucide-react";
import { Control, Controller, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import FieldArrayControls from "./FieldArrayControls";
import SpeakerHighlightsFieldArray from "./SpeakerHighlightsFieldArray";

interface Props {
	control: Control<OutsourceFormData>;
	register: UseFormRegister<OutsourceFormData>;
	errors: FieldErrors<OutsourceFormData>;
}

interface SpeakerCardProps extends Props {
	speakerIndex: number;
	speakersCount: number;
	onMove: (from: number, to: number) => void;
	onRemove: (index: number) => void;
}

const createEmptySpeaker = (order: number): OutsourceFormData["speakers"][number] => ({
	nameRu: "",
	nameUz: "",
	roleRu: "",
	roleUz: "",
	headlineRu: "",
	headlineUz: "",
	descriptionRu: "",
	descriptionUz: "",
	order,
	imageId: null,
	image: null,
	highlights: [],
});

const SpeakerCard: React.FC<SpeakerCardProps> = ({
	control,
	register,
	errors,
	speakerIndex,
	speakersCount,
	onMove,
	onRemove,
}) => {
	const speakerErrors = errors.speakers?.[speakerIndex];

	return (
		<div className="rounded-[14px] border border-gray-200 bg-white p-6 space-y-6 shadow-sm">
			<div className="flex items-center justify-between gap-3">
				<h3 className="text-18 font-semibold text-black-primary">Спикер {speakerIndex + 1}</h3>
				<FieldArrayControls
					index={speakerIndex}
					count={speakersCount}
					onMove={onMove}
					onRemove={onRemove}
					removeLabel="Удалить спикера"
					disableRemove={speakersCount === 1}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<h4 className="text-14 font-medium text-gray-600">Русский</h4>
					<CommonInput
						register={register}
						error={speakerErrors?.nameRu}
						title="Имя (RU)"
						name={`speakers.${speakerIndex}.nameRu`}
					/>
					<CommonInput
						register={register}
						error={speakerErrors?.roleRu}
						title="Роль (RU)"
						name={`speakers.${speakerIndex}.roleRu`}
					/>
					<Controller
						name={`speakers.${speakerIndex}.headlineRu`}
						control={control}
						render={({ field }) => (
							<RichTextInput
								label="Заголовок (RU)"
								value={field.value}
								onChange={field.onChange}
								error={speakerErrors?.headlineRu?.message}
							/>
						)}
					/>
					<Controller
						name={`speakers.${speakerIndex}.descriptionRu`}
						control={control}
						render={({ field }) => (
							<RichTextInput
								label="Описание (RU)"
								value={field.value}
								onChange={field.onChange}
								error={speakerErrors?.descriptionRu?.message}
							/>
						)}
					/>
				</div>

				<div className="space-y-4">
					<h4 className="text-14 font-medium text-gray-600">O‘zbekcha</h4>
					<CommonInput
						register={register}
						error={speakerErrors?.nameUz}
						title="Имя (UZ)"
						name={`speakers.${speakerIndex}.nameUz`}
					/>
					<CommonInput
						register={register}
						error={speakerErrors?.roleUz}
						title="Роль (UZ)"
						name={`speakers.${speakerIndex}.roleUz`}
					/>
					<Controller
						name={`speakers.${speakerIndex}.headlineUz`}
						control={control}
						render={({ field }) => (
							<RichTextInput
								label="Заголовок (UZ)"
								value={field.value}
								onChange={field.onChange}
								error={speakerErrors?.headlineUz?.message}
							/>
						)}
					/>
					<Controller
						name={`speakers.${speakerIndex}.descriptionUz`}
						control={control}
						render={({ field }) => (
							<RichTextInput
								label="Описание (UZ)"
								value={field.value}
								onChange={field.onChange}
								error={speakerErrors?.descriptionUz?.message}
							/>
						)}
					/>
				</div>
			</div>

			<div>
				<p className="text-14 font-medium text-black-primary mb-2">Изображение спикера</p>
				<Controller
					name={`speakers.${speakerIndex}.image`}
					control={control}
					render={({ field }) => (
						<ImageUpload value={field.value} onChange={field.onChange} error={speakerErrors?.image?.message} />
					)}
				/>
			</div>

			<div className="pt-2 border-t border-gray-100">
				<SpeakerHighlightsFieldArray
					control={control}
					register={register}
					errors={errors}
					speakerIndex={speakerIndex}
				/>
			</div>
		</div>
	);
};

const SpeakersFieldArray: React.FC<Props> = ({ control, register, errors }) => {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: "speakers",
		keyName: "fieldKey",
	});

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<p className="text-13 text-gray-500">Добавьте данные, изображение и преимущества каждого спикера.</p>
				<button
					type="button"
					onClick={() => append(createEmptySpeaker(fields.length))}
					className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-14 font-medium hover:bg-gray-50 transition-colors"
				>
					<Plus className="w-4 h-4" />
					Добавить спикера
				</button>
			</div>

			{fields.map((field, index) => (
				<SpeakerCard
					key={field.fieldKey}
					control={control}
					register={register}
					errors={errors}
					speakerIndex={index}
					speakersCount={fields.length}
					onMove={move}
					onRemove={remove}
				/>
			))}

			{typeof errors.speakers?.message === "string" && (
				<p className="text-14 text-red-600">{errors.speakers.message}</p>
			)}
		</div>
	);
};

export default SpeakersFieldArray;
