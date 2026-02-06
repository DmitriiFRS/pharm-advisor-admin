import { ReactNode } from "react";

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
	return <div className={`max-w-[1200px] px-[10px] m-[0_auto] ${className}`}>{children}</div>;
};

export default Container;
