"use client";

import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { IUserData } from "../types/user.type";

export const UserData = createContext<{
	me: IUserData | null;
	setMe: (me: IUserData | null) => void;
}>({
	me: null,
	setMe: () => {},
});

interface UserContextProviderProps extends PropsWithChildren {
	initialMe: IUserData | null;
}

const UserContextProvider = ({ children, initialMe }: UserContextProviderProps) => {
	const [me, setMe] = useState<IUserData | null>(initialMe);

	const value = useMemo(() => {
		return { me, setMe };
	}, [me]);

	return <UserData.Provider value={value}>{children}</UserData.Provider>;
};

export default UserContextProvider;
