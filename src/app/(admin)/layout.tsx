import Sidebar from "../../components/layout/Sidebar";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-[280px_1fr] min-h-screen">
			<Sidebar />
			<main className="bg-gray-50">{children}</main>
		</div>
	);
}
