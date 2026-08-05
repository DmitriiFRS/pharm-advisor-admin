import OutsourceFaqSection from "@/src/outsource/form/components/OutsourceFaqSection";
import OutsourceForm from "@/src/outsource/form/components/OutsourceForm";
import { getOutsourceAdmin, getOutsourceFaqsAdmin } from "@/src/outsource/api/api.server";

const OutsourcePage = async () => {
	const [outsourceResult, faqResult] = await Promise.all([getOutsourceAdmin(), getOutsourceFaqsAdmin()]);

	return (
		<div className="p-8 max-w-[1600px] mx-auto space-y-10">
			<div>
				<h1 className="text-24 font-bold text-black-primary">Управление страницей «Аутсорс»</h1>
				<p className="text-14 text-gray-500 mt-2">
					{outsourceResult.data
						? "Редактирование опубликованного контента страницы."
						: "Страница ещё не создана. Заполните форму, чтобы создать её."}
				</p>
			</div>

			<div id="content" className="scroll-mt-6">
				{outsourceResult.error ? (
					<div className="bg-red-50 border border-red-200 text-red-700 rounded-[12px] p-5 max-w-[1200px] mx-auto">
						<h2 className="font-semibold">Не удалось загрузить данные страницы</h2>
						<p className="text-14 mt-1">{outsourceResult.error}</p>
					</div>
				) : (
					<OutsourceForm key={outsourceResult.data?.id || "create"} initialData={outsourceResult.data} />
				)}
			</div>

			<div id="faq" className="scroll-mt-6">
				<OutsourceFaqSection initialFaqs={faqResult.data || []} initialError={faqResult.error} />
			</div>
		</div>
	);
};

export default OutsourcePage;
