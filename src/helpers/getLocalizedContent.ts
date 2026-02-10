export const getLocalizedContent = <T extends { locale: string }>(translations: T[] | undefined, locale: string, key: keyof T): string => {
	if (!translations) return "";
	const translation = translations.find((t) => t.locale === locale);
	return (translation?.[key] as string) || "";
};
