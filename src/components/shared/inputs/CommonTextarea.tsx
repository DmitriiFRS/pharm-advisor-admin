import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>;
	error?: { message?: string };
	title: string;
	name: Path<T>;
	placeholder?: string;
	isDisabled?: boolean;
	className?: string;
	rows?: number;
}

const CommonTextarea = <T extends FieldValues>({
	register,
	error,
	title,
	name,
	placeholder,
	isDisabled,
	className,
	rows = 4,
}: Props<T>) => {
	return (
		<div className={`flex flex-col gap-1 ${className || ""}`}>
			<label className="text-14 font-medium text-black-primary" htmlFor={name}>
				{title}
			</label>
			<textarea
				id={name}
				disabled={isDisabled}
				{...register(name)}
				rows={rows}
				placeholder={placeholder}
				className={`w-full min-h-[112px] resize-y px-4 py-3 rounded-[8px] border border-gray-200 outline-none focus:border-black transition-colors ${
					error ? "border-red-500" : ""
				} ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
			/>
			{error?.message && <span className="text-14 text-red-600">{error.message}</span>}
		</div>
	);
};

export default CommonTextarea;
