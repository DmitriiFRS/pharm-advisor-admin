"use client";

import { Control, useFieldArray, FieldValues, UseFormRegister, ArrayPath, Path } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

interface Props<T extends FieldValues> {
	control: Control<T>;
	register: UseFormRegister<T>;
	name: ArrayPath<T>;
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any;
	placeholder?: string;
}

const DynamicStringList = <T extends FieldValues>({ control, register, name, title, error, placeholder }: Props<T>) => {
	const { fields, append, remove } = useFieldArray({
		control,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		name: name as any,
	});

	return (
		<div className="flex flex-col gap-2">
			<p className="text-14 font-medium">{title}</p>
			<div className="flex flex-col gap-3">
				{fields.map((item, index) => (
					<div key={item.id} className="flex flex-col gap-1">
						<div className="flex items-start gap-2">
							<div className="flex-1">
								<input
									{...register(`${name}.${index}` as Path<T>)}
									type="text"
									placeholder={placeholder}
									className={`w-full h-[50px] px-4 rounded-[8px] border outline-none focus:border-black transition-colors bg-white ${
										error?.[index]?.message ? "border-error-red" : "border-gray-200"
									}`}
								/>
							</div>
							<button
								type="button"
								onClick={() => remove(index)}
								className="h-[50px] px-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 flex items-center justify-center border border-transparent"
								title="Удалить"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						</div>
						{error?.[index]?.message && <span className="text-14 text-red-600 block pl-2">{error[index].message}</span>}
					</div>
				))}
				{fields.length === 0 && <p className="text-14 text-gray-500 py-2">Список пуст. Нажмите кнопку ниже, чтобы добавить.</p>}
			</div>
			<button
				type="button"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick={() => append("" as any)}
				className="flex items-center justify-center gap-2 py-3 px-4 rounded-[8px] border-2 border-dashed border-gray-200 text-gray-500 hover:border-black hover:text-black transition-colors mt-2 font-medium"
			>
				<Plus className="w-4 h-4" />
				<span>Добавить пункт</span>
			</button>
			{error?.message && typeof error.message === "string" && <span className="text-14 text-red-600 block mt-1">{error.message}</span>}
		</div>
	);
};

export default DynamicStringList;
