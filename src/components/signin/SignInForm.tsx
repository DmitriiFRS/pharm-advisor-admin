"use client";

import { useLoginForm } from "../../service/form/hooks/useLoginForm";
import CommonInput from "../shared/inputs/CommonInput";
import PrimaryButton from "../shared/buttons/PrimaryButton";

const SignInForm: React.FC = () => {
	const { isLoading, register, handleSubmit, errors, isValid, isSubmitting } = useLoginForm();

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
			<div className="w-full max-w-[400px] p-8 bg-white rounded-2xl shadow-lg">
				<h1 className="text-24 font-bold text-center mb-8 text-black-primary">Вход в личный кабинет</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<CommonInput
						register={register}
						title="Email"
						name="email"
						placeholder="user@example.com"
						error={errors.email}
						className="w-full"
					/>

					<CommonInput
						register={register}
						title="Пароль"
						name="password"
						type="password"
						placeholder="******"
						error={errors.password}
						className="w-full"
					/>

					<PrimaryButton
						type="submit"
						disabled={!isValid || isSubmitting || isLoading}
						loading={isSubmitting || isLoading}
						className="mt-2 bg-primary-gradient"
					>
						Войти
					</PrimaryButton>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
