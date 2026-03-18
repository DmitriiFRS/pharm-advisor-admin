import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	title: string;
}

const ServiceWrapper: React.FC<Props> = ({ title, children }) => {
	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<Link href="/services" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black-primary transition-colors">
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<h1 className="text-24 font-bold text-black-primary">{title}</h1>
			</div>

			{children}
		</div>
	);
};

export default ServiceWrapper;
