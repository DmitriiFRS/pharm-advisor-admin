import { Path, useController, Control, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
	control: Control<T>;
	error?: { message?: string };
	title: string;
	name: Path<T>;
	placeholder?: string;
	allowDecimal?: boolean;
	maxLength?: number;
	isDisabled?: boolean;
	className?: string; // Container class
	titleClassName?: string;
	inputClassName?: string;
}

const NumberInput = <T extends FieldValues>({
	control,
	error,
	title,
	name,
	placeholder,
	allowDecimal = true,
	maxLength,
	isDisabled,
	className,
	titleClassName,
	inputClassName,
}: Props<T>) => {
	const { field } = useController({
		name,
		control,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (allowDecimal) {
			value = value.replace(",", ".");
		}
		const regex = allowDecimal ? /^\d*\.?\d*$/ : /^\d*$/;
		if (value === "" || regex.test(value)) {
			field.onChange(value);
		}
	};

	return (
		<div className={`flex flex-col gap-1 ${className || ""}`}>
			<div className="flex flex-col gap-1">
				<p className={`text-14 font-medium ${titleClassName || ""}`}>{title}</p>
				<input
					disabled={isDisabled}
					{...field}
					onChange={handleInputChange}
					value={field.value || ""}
					maxLength={maxLength || 20}
					type="text"
					inputMode="numeric"
					placeholder={placeholder}
					className={`w-full h-[50px] px-4 rounded-[8px] border border-gray-200 outline-none focus:border-black transition-colors
                        ${error ? "border-error-red" : ""} 
                        ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} 
                        ${inputClassName || ""}`}
				/>
			</div>
			{error?.message && <span className="text-14 text-red-600 block">{error.message}</span>}
		</div>
	);
};

export default NumberInput;
