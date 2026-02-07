import NewsCreateForm from "@/src/components/news/NewsCreateForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateNewsPage() {
	return (
		<div className="p-8 max-w-[1600px] mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<Link href="/news" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black-primary transition-colors">
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<h1 className="text-24 font-bold text-black-primary">Создание новости</h1>
			</div>

			<NewsCreateForm />
		</div>
	);
}
