"use client";

import { useDropzone } from "react-dropzone";
import { FileText, X, Upload } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

interface Props {
	value?: File | { url: string; fileName: string } | null;
	onChange: (file: File | null) => void;
	error?: string;
	className?: string;
}

const PdfUpload: React.FC<Props> = ({ value, onChange, error, className }) => {
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
			"application/pdf": [".pdf"],
		},
		maxFiles: 1,
		multiple: false,
	});

	const removeFile = (e: React.MouseEvent) => {
		e.stopPropagation();
		onChange(null);
	};

	const fileName = value instanceof File ? value.name : value?.fileName;
	const fileUrl = value instanceof File ? null : value?.url;

	return (
		<div className={cn("w-full", className)}>
			<div
				{...getRootProps()}
				className={cn(
					"border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer relative flex flex-col items-center justify-center min-h-[120px]",
					isDragActive ? "border-e94190 bg-e94190/5" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
					error && "border-red-500",
					fileName ? "border-solid bg-gray-50" : ""
				)}
			>
				<input {...getInputProps()} />

				{fileName ? (
					<div className="flex items-center gap-4 w-full p-2">
						<div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
							<FileText size={20} />
						</div>
						<div className="flex-1 min-w-0">
							{fileUrl ? (
								<Link
									href={fileUrl}
									target="_blank"
									onClick={(e) => e.stopPropagation()}
									className="text-14 font-medium text-black-primary hover:text-blue-600 truncate block hover:underline"
								>
									{fileName}
								</Link>
							) : (
								<p className="text-14 font-medium text-black-primary truncate">{fileName}</p>
							)}
							<p className="text-12 text-gray-400">PDF документ</p>
						</div>
						<button onClick={removeFile} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
							<X size={16} />
						</button>
					</div>
				) : (
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
							<Upload size={20} />
						</div>
						<div>
							<p className="text-14 font-medium text-black-primary">{isDragActive ? "Отпустите файл" : "Загрузить PDF"}</p>
							<p className="text-12 text-gray-400 mt-1">до 200MB</p>
						</div>
					</div>
				)}
			</div>
			{error && <p className="text-12 text-red-500 mt-1">{error}</p>}
		</div>
	);
};

export default PdfUpload;
