"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { ChevronDown, ChevronUp, HelpCircle, GraduationCap, Phone, Newspaper, User, LogOut, Home } from "lucide-react";
import logo from "@/public/logo.webp";
import { UserData } from "@/src/context/UserContext";

interface MenuItem {
	title: string;
	icon: React.ElementType;
	href?: string;
	submenu?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
	{
		title: "Главная",
		icon: Home,
		href: "/",
	},
	{
		title: "Новости",
		icon: Newspaper,
		submenu: [
			{ title: "Все новости", href: "/news" },
			{ title: "Новая новость", href: "/news/create" },
		],
	},
	{
		title: "Пользователи",
		icon: User,
		submenu: [
			{ title: "Все пользователи", href: "/users" },
			// { title: "Новый пользователь", href: "/users/create" },
		],
	},
	// {
	// 	title: "FAQ",
	// 	icon: HelpCircle,
	// 	submenu: [
	// 		{ title: "Все FAQ", href: "/faq" },
	// 		{ title: "Новый вопрос-ответ", href: "/faq/create" },
	// 	],
	// },
	// {
	// 	title: "Карточки обучения",
	// 	icon: GraduationCap,
	// 	submenu: [
	// 		{ title: "Все карточки", href: "/education" },
	// 		{ title: "Новая карточка", href: "/education/create" },
	// 	],
	// },
	{
		title: "Контакты",
		icon: Phone,
		href: "/contacts",
	},
];

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { me, setMe } = useContext(UserData);
	const [openMenus, setOpenMenus] = useState<string[]>([]);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const toggleMenu = (title: string) => {
		setOpenMenus((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
	};

	const isActive = (href: string) => pathname === href;

	const handleLogout = async () => {
		await fetch("/api/auth/remove_token");
		setMe(null);
		router.push("/signin");
	};

	return (
		<aside className="sticky top-0 h-screen w-[280px] bg-white border-r border-gray-200 p-4 flex flex-col overflow-y-auto z-50">
			<div className="mb-8 px-2 flex justify-center">
				<Image src={logo} alt="PharmAdvisor" width={120} height={30} className="object-contain" priority />
			</div>

			<nav className="flex flex-col gap-2 flex-grow">
				{menuItems.map((item) => (
					<div key={item.title}>
						{item.submenu ? (
							<>
								<button
									onClick={() => toggleMenu(item.title)}
									className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50 
                                        ${openMenus.includes(item.title) ? "bg-gray-50" : ""}`}
								>
									<div className="flex items-center gap-3">
										<item.icon className="w-5 h-5 text-gray-500" />
										<span className="text-14 font-medium text-black-primary">{item.title}</span>
									</div>
									{openMenus.includes(item.title) ? (
										<ChevronUp className="w-4 h-4 text-gray-400" />
									) : (
										<ChevronDown className="w-4 h-4 text-gray-400" />
									)}
								</button>
								{openMenus.includes(item.title) && (
									<div className="flex flex-col gap-1 pl-11 pt-1">
										{item.submenu.map((subItem) => (
											<Link
												key={subItem.href}
												href={subItem.href}
												className={`text-13 py-2 px-3 rounded-md transition-colors block
                                                    ${
																			isActive(subItem.href)
																				? "text-e94190 bg-e94190/5 font-medium"
																				: "text-gray-500 hover:text-black-primary hover:bg-gray-50"
																		}`}
											>
												{subItem.title}
											</Link>
										))}
									</div>
								)}
							</>
						) : (
							<Link
								href={item.href!}
								className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50
                                    ${isActive(item.href!) ? "bg-gray-50" : ""}`}
							>
								<item.icon className={`w-5 h-5 ${isActive(item.href!) ? "text-e94190" : "text-gray-500"}`} />
								<span className={`text-14 font-medium ${isActive(item.href!) ? "text-black-primary" : "text-black-primary"}`}>
									{item.title}
								</span>
							</Link>
						)}
					</div>
				))}
			</nav>

			{me && (
				<div className="mt-auto border-t border-gray-100 pt-4 relative">
					{showUserMenu && (
						<div className="absolute bottom-[calc(100%+10px)] left-0 w-full bg-white border border-gray-100 shadow-lg rounded-xl p-2 animate-in fade-in slide-in-from-bottom-2">
							<button
								onClick={handleLogout}
								className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
							>
								<LogOut className="w-4 h-4" />
								<span className="text-14 font-medium">Выйти из аккаунта</span>
							</button>
						</div>
					)}
					<button
						onClick={() => setShowUserMenu(!showUserMenu)}
						className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
					>
						<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
							<User className="w-5 h-5 text-gray-500" />
						</div>
						<div className="flex flex-col overflow-hidden">
							<span className="text-14 font-medium text-black-primary truncate">{me.name}</span>
							<span className="text-12 text-gray-500 truncate">{me.email}</span>
						</div>
						<div className="ml-auto">
							{showUserMenu ? (
								<ChevronDown className="w-4 h-4 text-gray-400 rotate-180 transition-transform" />
							) : (
								<ChevronDown className="w-4 h-4 text-gray-400 transition-transform" />
							)}
						</div>
					</button>
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
