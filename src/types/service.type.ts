export interface IService {
	id: number;
	name: string;
	price: number | null;
	label: string;
	description: string;
	serviceFeatures: string[];
	createdAt: string;
	updatedAt: string;
}
