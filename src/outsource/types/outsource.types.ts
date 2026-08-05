export interface ApiResponse<T, M = object | null> {
	data: T;
	meta: M;
}

export interface Media {
	id: number;
	url: string;
	fileName: string;
	mimeType: string;
	size: number;
}

export interface OutsourceTranslation {
	id: number;
	locale: string;
	heroTitle: string;
	programTitle: string;
	speakerName: string;
	speakerRole: string;
	speakerHeadline: string;
	speakerDescription: string;
}

export interface OutsourceHeroCardTranslation {
	id: number;
	locale: string;
	title: string;
	subtitle: string;
}

export interface OutsourceHeroCard {
	id: number;
	title: string;
	subtitle: string;
	order: number;
	iconId: number | null;
	icon: Media | null;
	translations: OutsourceHeroCardTranslation[];
}

export interface OutsourceProgramItemTranslation {
	id: number;
	locale: string;
	title: string;
	description: string;
}

export interface OutsourceProgramItem {
	id: number;
	title: string;
	description: string;
	order: number;
	translations: OutsourceProgramItemTranslation[];
}

export interface OutsourceSpeakerHighlightTranslation {
	id: number;
	locale: string;
	title: string;
	description: string;
}

export interface OutsourceSpeakerHighlight {
	id: number;
	title: string;
	description: string;
	order: number;
	translations: OutsourceSpeakerHighlightTranslation[];
}

export interface OutsourceDetail {
	id: number;
	startsAt: string;
	heroTitle: string;
	programTitle: string;
	speakerName: string;
	speakerRole: string;
	speakerHeadline: string;
	speakerDescription: string;
	programImageId: number | null;
	speakerImageId: number | null;
	programImage: Media | null;
	speakerImage: Media | null;
	translations: OutsourceTranslation[];
	heroCards: OutsourceHeroCard[];
	programItems: OutsourceProgramItem[];
	speakerHighlights: OutsourceSpeakerHighlight[];
}

export interface FaqTranslation {
	id: number;
	locale: string;
	question: string;
	answer: string;
}

export interface OutsourceFaq {
	id: number;
	question: string;
	answer: string;
	translations: FaqTranslation[];
	createdAt: string;
	updatedAt: string;
}
