"use client";

import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FieldError, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface Props<T extends FieldValues> {
	name: Path<T>;
	setValue: UseFormSetValue<T>;
	watchedDateValue: string | undefined;
	error: FieldError | undefined;
	title?: string;
	placeholder?: string;
	className?: string;
}

const SingleDateSelect = <T extends FieldValues>({ name, setValue, watchedDateValue, error, title, placeholder, className }: Props<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	function handleDateSelect(newDate: Date | undefined) {
		if (newDate) {
			const offset = newDate.getTimezoneOffset();
			const date = new Date(newDate.getTime() - offset * 60 * 1000);
			const dateString = date.toISOString().split("T")[0];
			setValue(name, dateString as PathValue<T, Path<T>>, {
				shouldValidate: true,
				shouldDirty: true,
			});
		} else {
			setValue(name, "" as PathValue<T, Path<T>>, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
		setIsOpen(false);
	}

	const selectedDate = useMemo(() => {
		if (!watchedDateValue) {
			return undefined;
		}

		if (typeof watchedDateValue === "string") {
			const ruDateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
			const match = watchedDateValue.match(ruDateRegex);
			if (match) {
				const day = parseInt(match[1], 10);
				const month = parseInt(match[2], 10) - 1;
				const year = parseInt(match[3], 10);
				const date = new Date(year, month, day);
				if (!isNaN(date.getTime())) return date;
			}
		}

		const safeDateString = typeof watchedDateValue === "string" ? watchedDateValue.replace(/(\.\d{3})\d+/, "$1") : watchedDateValue;
		const dateObj = new Date(safeDateString);
		return !isNaN(dateObj.getTime()) ? dateObj : undefined;
	}, [watchedDateValue]);

	useEffect(() => {
		if (selectedDate) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setInputValue(selectedDate.toLocaleDateString("ru-RU"));
		} else {
			setInputValue("");
		}
	}, [selectedDate]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

		if (value.length > 8) {
			value = value.slice(0, 8);
		}

		if (value.length >= 5) {
			value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
		} else if (value.length >= 3) {
			value = `${value.slice(0, 2)}.${value.slice(2)}`;
		}

		setInputValue(value);

		const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
		const match = value.match(dateRegex);

		if (match) {
			const day = parseInt(match[1], 10);
			const month = parseInt(match[2], 10) - 1;
			const year = parseInt(match[3], 10);
			const date = new Date(year, month, day);

			if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
				const offset = date.getTimezoneOffset();
				const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
				const dateString = adjustedDate.toISOString().split("T")[0];

				setValue(name, dateString as PathValue<T, Path<T>>, {
					shouldValidate: true,
					shouldDirty: true,
				});
			}
		} else if (value === "") {
			setValue(name, "" as PathValue<T, Path<T>>, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	};

	return (
		<div className={className}>
			<p className="text-14 font-medium text-black-primary mb-2">{title}</p>
			<div className="relative">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder={placeholder || title}
					className={`w-full border rounded-xl px-4 py-3 text-14 outline-none transition-colors 
                        ${error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-e94190 hover:border-gray-300"}`}
				/>
				<Popover open={isOpen} onOpenChange={setIsOpen}>
					<PopoverTrigger asChild>
						<button
							type="button"
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black-primary transition-colors p-1"
						>
							<CalendarIcon size={18} />
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="end">
						<Calendar
							mode="single"
							defaultMonth={selectedDate}
							captionLayout="dropdown"
							selected={selectedDate}
							onSelect={handleDateSelect}
							className="rounded-md border shadow-sm"
							fromYear={1900}
							toYear={2100}
							classNames={{
								day_selected: "bg-e94190 text-white hover:bg-e94190 hover:text-white focus:bg-e94190 focus:text-white",
								day_today: "bg-gray-100 text-black-primary",
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			{error && <p className="text-12 text-red-500 mt-1">{error.message}</p>}
		</div>
	);
};

export default SingleDateSelect;
