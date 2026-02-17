"use client";

import { Edit, Trash2 } from "lucide-react";
import React from "react";
import PagesPagination from "../pagination/Pagination";

export interface Column<T> {
	header: string;
	accessorKey?: keyof T;
	cell?: (row: T) => React.ReactNode;
}

interface PaginationProps {
	page: number;
	totalPages: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	setLoading: (b: boolean) => void;
	withFalseSetLoading?: boolean;
}

interface Props<T> {
	data: T[];
	columns: Column<T>[];
	onEdit?: (item: T) => void;
	onDelete?: (item: T) => void;
	isLoading?: boolean;
	pagination?: PaginationProps;
}

function CommonList<T extends { id: string | number }>({ data, columns, onEdit, onDelete, isLoading, pagination }: Props<T>) {
	return (
		<div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100">
							{columns.map((col, index) => (
								<th key={index} className="text-left py-3 px-4 text-14 font-medium text-gray-500 whitespace-nowrap">
									{col.header}
								</th>
							))}
							{(onEdit || onDelete) && <th className="text-right py-3 px-4 text-14 font-medium text-gray-500">Действия</th>}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{isLoading ? (
							<tr>
								<td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-8 text-center text-gray-500">
									Загрузка...
								</td>
							</tr>
						) : data.length === 0 ? (
							<tr>
								<td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-8 text-center text-gray-500">
									Нет данных
								</td>
							</tr>
						) : (
							data.map((row) => (
								<tr key={row.id} className="hover:bg-gray-50 transition-colors group">
									{columns.map((col, index) => (
										<td key={index} className="py-3 px-4 text-14 text-black-primary">
											{col.cell ? col.cell(row) : (row[col.accessorKey as keyof T] as React.ReactNode)}
										</td>
									))}
									{(onEdit || onDelete) && (
										<td className="py-3 px-4 text-right">
											<div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
												{onEdit && (
													<button
														onClick={() => onEdit(row)}
														className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
														title="Редактировать"
													>
														<Edit className="w-4 h-4" />
													</button>
												)}
												{onDelete && (
													<button
														onClick={() => onDelete(row)}
														className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
														title="Удалить"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												)}
											</div>
										</td>
									)}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{pagination && (
				<div className="mt-4 flex justify-center">
					<PagesPagination {...pagination} />
				</div>
			)}
		</div>
	);
}

export default CommonList;
