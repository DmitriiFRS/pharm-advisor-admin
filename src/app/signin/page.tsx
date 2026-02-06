import { Metadata } from "next";
import SignInForm from "../../components/signin/SignInForm";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Вход в личный кабинет";
	const description = "Вход в личный кабинет";
	const ogTitle = "Вход в личный кабинет";
	const ogDescription = "Вход в личный кабинет";

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

const SignInPage: React.FC = () => {
	return <SignInForm />;
};

export default SignInPage;
