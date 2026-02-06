import Link from "next/link";
import React from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	href?: string;
	type?: "button" | "submit" | "reset";
}

const BlackButton: React.FC<Props> = ({ className, children = "Узнать подробнее", onClick, href, type = "button" }) => {
	return href ? (
		<Link
			href={href}
			className={`cursor-pointer w-full h-[50px] bg-black text-white text-[14px] font-medium rounded-[8px] flex items-center justify-center hover:bg-opacity-90 transition-all ${className}`}
		>
			{children}
		</Link>
	) : (
		<button
			type={type}
			onClick={onClick}
			className={`cursor-pointer w-full h-[50px] bg-black text-white text-[14px] font-medium rounded-[8px] flex items-center justify-center hover:bg-opacity-90 transition-all ${className}`}
		>
			{children}
		</button>
	);
};

export default BlackButton;
