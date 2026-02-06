import { UseFormRegister, Path } from "react-hook-form";

interface Props<T extends Record<string, string | number | null>> {
	register: UseFormRegister<T>;
	error?: { message?: string };
	title: string;
	name: Path<T>;
	placeholder?: string;
	isDisabled?: boolean;
	className?: string; // Container class
	titleClassName?: string;
	inputClassName?: string;
	type?: string;
}

const CommonInput = <T extends Record<string, string | number | null>>({
	register,
	error,
	title,
	name,
	placeholder,
	isDisabled,
	className,
	titleClassName,
	inputClassName,
	type = "text",
}: Props<T>) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			<div className="flex flex-col gap-1">
				<p className={`text-14 font-medium ${titleClassName}`}>{title}</p>
				<input
					disabled={isDisabled}
					{...register(name)}
					type={type}
					placeholder={placeholder}
					className={`w-full h-[50px] px-4 rounded-[8px] border border-gray-200 outline-none focus:border-black transition-colors
                        ${error ? "border-error-red" : ""} 
                        ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} 
                        ${inputClassName}`}
				/>
			</div>

			{error?.message && <span className="text-14 text-red-600 block">{error.message}</span>}
		</div>
	);
};

export default CommonInput;
