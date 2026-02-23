export interface IContact {
	data: {
		phone: string;
		email: string;
		telegramLink: string;
		instagramLink: string;
		googleMapsLink: string;
		translations?: {
			locale: string;
			address: string;
		}[];
	};
}
