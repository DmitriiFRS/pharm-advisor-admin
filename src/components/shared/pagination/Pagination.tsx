"use client";

import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/src/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
	page: number;
	totalPages: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	setLoading: (b: boolean) => void;
	withFalseSetLoading?: boolean;
}

const PagesPagination: React.FC<Props> = ({ page, totalPages, hasPreviousPage, hasNextPage, setLoading, withFalseSetLoading }) => {
	const params = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const setPage = (newPage: number) => {
		setLoading(true);
		const newParams = new URLSearchParams(params.toString());
		newParams.set("page", newPage.toString());
		router.push(`${pathname}?${newParams.toString()}`);
		if (withFalseSetLoading) {
			setLoading(false);
		}
	};

	let startPage = Math.max(Math.min(page - 2, totalPages - 4), 1);
	const endPage = Math.min(startPage + 4, totalPages);
	if (endPage - startPage < 4) {
		startPage = Math.max(endPage - 4, 1);
	}

	const pages: (number | "...")[] = [];

	if (startPage > 1) {
		pages.push(1);
		if (startPage > 2) {
			pages.push("...");
		}
	}

	for (let p = startPage; p <= endPage; p++) {
		pages.push(p);
	}

	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			pages.push("...");
		}
		pages.push(totalPages);
	}

	return (
		<Pagination className="mt-4">
			<PaginationContent>
				{hasPreviousPage && (
					<PaginationItem className="cursor-pointer">
						<PaginationPrevious
							onClick={(e) => {
								e.preventDefault();
								setPage(page - 1);
							}}
							className="hover:bg-gray-100 hover:text-black-primary transition-colors text-gray-500"
						/>
					</PaginationItem>
				)}

				{pages.map((item, idx) =>
					item === "..." ? (
						<span key={`dot-${idx}`} className="px-4 py-2 text-gray-500">
							...
						</span>
					) : (
						<PaginationItem key={item} className="cursor-pointer">
							{page === item ? (
								<span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-gradient text-white font-medium shadow-sm">
									{item}
								</span>
							) : (
								<PaginationLink
									className="text-gray-600 hover:bg-gray-100 hover:text-black-primary transition-colors"
									onClick={(e) => {
										e.preventDefault();
										setPage(item as number);
									}}
								>
									{item}
								</PaginationLink>
							)}
						</PaginationItem>
					)
				)}

				{hasNextPage && (
					<PaginationItem className="cursor-pointer">
						<PaginationNext
							onClick={(e) => {
								e.preventDefault();
								setPage(page + 1);
							}}
							className="hover:bg-gray-100 hover:text-black-primary transition-colors text-gray-500"
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PagesPagination;
