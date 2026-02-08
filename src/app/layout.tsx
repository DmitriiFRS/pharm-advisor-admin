import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import { authServerApi } from "../service/api/auth.server";
import UserContextProvider from "../context/UserContext";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Фарм консалтинг в Узбекистане: Регистрация ЛС, GxP аудит и Обучение";
	const description =
		"Комплексный консалтинг для фармацевтических компаний в Ташкенте и РУз. Регистрация лекарств и БАД, внедрение стандартов GMP/GDP, обучение персонала и подготовка к инспекциям.";
	const ogTitle = "Фарм консалтинг и обучение в Узбекистане – Ваша компания";
	const ogDescription =
		"Помогаем фармбизнесу расти: от регистрации препаратов до внедрения GxP и обучения сотрудников. Профессиональная поддержка в Ташкенте.";

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"),
		title,
		description,
		openGraph: {
			title: ogTitle,
			description: ogDescription,
		},
	};
}

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");
	const user = await authServerApi.getUser(accessToken?.value);

	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={true} />
				<NextTopLoader
					color="#ffffff"
					initialPosition={0.08}
					crawlSpeed={200}
					height={2}
					showSpinner={false}
					shadow="0 0 10px #fff,0 0 5px #fff"
				/>
				<div className="wrapper">
					<UserContextProvider initialMe={user}>
						<main>{children}</main>
					</UserContextProvider>
				</div>
			</body>
		</html>
	);
}
