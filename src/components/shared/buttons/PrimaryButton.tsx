import Link from "next/link";
import Spinner from "../Spinner";

interface Props {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	href?: string;
}

const PrimaryButton: React.FC<Props> = ({ className, children, onClick, loading, disabled, type = "button", href }) => {
	const baseClasses = `cursor-pointer h-10 max-w-55 w-full p-2.5 rounded-[8px] bg-primary-gradient text-14 leading-100 text-white font-medium transition-all duration-300 
                hover:shadow-[0_4px_14px_0_rgba(233,65,144,0.39)] hover:scale-[1.02] active:scale-95 hover:brightness-105 
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 disabled:active:scale-100
                flex items-center justify-center gap-2
                ${className}`;

	if (href && !disabled && !loading) {
		return (
			<Link href={href} className={baseClasses} onClick={onClick}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} disabled={loading || disabled} className={baseClasses}>
			{loading ? <Spinner className="w-4 h-4" /> : children}
		</button>
	);
};

export default PrimaryButton;
