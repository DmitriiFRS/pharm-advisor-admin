import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginSchema } from "../schemas/login.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../api/api";
import { useContext } from "react";
import { UserData } from "@/src/context/UserContext";

import { toast } from "react-toastify";

export const useLoginForm = () => {
	const { setMe } = useContext(UserData);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);
			const response = await api.post({ url: "auth/admin/login", body: data });

			if (response.data) {
				await fetch("/api/auth/set_token", {
					method: "POST",
					body: JSON.stringify(response.data),
				});
				setMe(response.data.user);
				toast.success("Вы успешно вошли в систему");
				router.push("/");
			} else if (response.message) {
				toast.error(response.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Произошла ошибка при входе");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
		isValid,
		isSubmitting,
	};
};
