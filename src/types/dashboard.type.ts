export interface IRegistrationGraphData {
	data: IRegistrationGraph[];
	meta: null;
}

export interface IRegistrationGraph {
	month: string;
	users: number;
}

export interface ILoginGraphData {
	data: ILoginGraph[];
	meta: null;
}

export interface ILoginGraph {
	month: string;
	logins: number;
}

export interface IActivityResponse {
	data: {
		latestRegistrations: ILatestRegistration[];
		latestLogins: ILatestLogin[];
	};
}

export interface ILatestRegistration {
	id: number;
	email: string;
	name: string;
	createdAt: string;
	role: {
		id: number;
		name: string;
	};
}

export interface ILatestLogin {
	id: number;
	userId: number;
	createdAt: string;
	user: {
		id: number;
		email: string;
		name: string;
	};
}
