import Link from "next/link";
import { Fragment } from "react";
import { BreadcrumbItem } from "./types";

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
	return (
		<nav className={`flex items-center text-grey-primary text-14 ${className}`}>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<Fragment key={index}>
						{item.href && !isLast ? (
							<Link href={item.href} className="hover:text-black transition-colors">
								{item.label}
							</Link>
						) : (
							<span>{item.label}</span>
						)}
						{!isLast && <span className="mx-1">/</span>}
					</Fragment>
				);
			})}
		</nav>
	);
};
