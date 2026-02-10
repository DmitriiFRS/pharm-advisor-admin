"use client";

import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { cn } from "@/src/lib/utils";

interface Props {
	value?: File | string | null;
	onChange: (file: File | null) => void;
	error?: string;
	className?: string;
}

const ImageUpload: React.FC<Props> = ({ value, onChange, error, className }) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file) {
				onChange(file);
			}
		},
		[onChange]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".webp"],
		},
		maxFiles: 1,
		multiple: false,
	});

	const removeImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		onChange(null);
	};

	const previewUrl = value instanceof File ? URL.createObjectURL(value) : value;

	useEffect(() => {
		console.log(`${process.env.NEXT_PUBLIC_IMAGE_URL}${previewUrl}`);
	}, [previewUrl]);

	return (
		<div className={cn("w-full", className)}>
			<div
				{...getRootProps()}
				className={cn(
					"border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer relative flex flex-col items-center justify-center min-h-[200px]",
					isDragActive ? "border-e94190 bg-e94190/5" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
					error && "border-red-500",
					previewUrl ? "border-solid p-0 overflow-hidden" : ""
				)}
			>
				<input {...getInputProps()} />

				{previewUrl ? (
					<div className="relative w-full h-[200px]">
						<Image
							src={
								previewUrl?.startsWith("http") || previewUrl?.startsWith("blob:")
									? previewUrl
									: `${process.env.NEXT_PUBLIC_IMAGE_URL}${previewUrl}`
							}
							alt="Preview"
							fill
							className="object-cover rounded-xl"
							unoptimized
						/>
						<button
							onClick={removeImage}
							className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white text-gray-700 transition-colors shadow-sm"
						>
							<X size={16} />
						</button>
					</div>
				) : (
					<div className="flex flex-col items-center gap-3 text-center">
						<div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
							<Upload size={24} />
						</div>
						<div>
							<p className="text-14 font-medium text-black-primary">
								{isDragActive ? "Отпустите файл здесь" : "Перетащите изображение сюда"}
							</p>
							<p className="text-12 text-gray-500 mt-1">или нажмите для выбора</p>
						</div>
						<p className="text-12 text-gray-400">PNG, JPG, WEBP до 5MB</p>
					</div>
				)}
			</div>
			{error && <p className="text-12 text-red-500 mt-1">{error}</p>}
		</div>
	);
};

export default ImageUpload;
