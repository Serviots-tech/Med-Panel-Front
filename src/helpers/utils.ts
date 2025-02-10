/* eslint-disable @typescript-eslint/no-explicit-any */
export function invalidText(value: string | number | null | undefined) {
	return (
		value === null ||
		value === undefined ||
		value.toString().trim().length === 0
	);
}

export function validateFormData(
	dataObj: { [key: string]: any },
	errObj: { [key: string]: boolean }
): { [key: string]: boolean } {
	Object.keys(dataObj).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(errObj, key)) {
			errObj[key] = invalidText(dataObj[key]);
		}
	});

	return errObj;
}


export function hasFormError(errObj: { [key: string]: boolean }): boolean {
	return Object.keys(errObj).some((key) => {
		return errObj[key];
	});
}

export enum ProductCategory {
    MOTHER_CARE = 'MOTHER_CARE',
    PROTEIN_POWDERS_DRINKS = 'PROTEIN_POWDERS_DRINKS',
    VITAMINS_SUPPLEMENTS = 'VITAMINS_SUPPLEMENTS',
    SEXUAL_HEALTH_SUPPLEMENTS = 'SEXUAL_HEALTH_SUPPLEMENTS',
    FEMININE_HYGIENE = 'FEMININE_HYGIENE',
    GROOMING = 'GROOMING',
    HAIR_CARE = 'HAIR_CARE',
    ORAL_CARE = 'ORAL_CARE',
    FRAGRANCES = 'FRAGRANCES',
    PET_PRODUCT = 'PET_PRODUCT',
    CLEANING_ESSENTIALS = 'CLEANING_ESSENTIALS',
    FOOD_DRINK = 'FOOD_DRINK',
    DIAPERS_WIPES = 'DIAPERS_WIPES',
    BABY_PRODUCT = 'BABY_PRODUCT',
    SKIN_CARE = 'SKIN_CARE',
}

const categoryLabels: Record<ProductCategory, string> = {
    [ProductCategory.MOTHER_CARE]: 'Mother Care',
    [ProductCategory.PROTEIN_POWDERS_DRINKS]: 'Protein Powders & Drinks',
    [ProductCategory.VITAMINS_SUPPLEMENTS]: 'Vitamins & Supplements',
    [ProductCategory.SEXUAL_HEALTH_SUPPLEMENTS]: 'Sexual Health Supplements',
    [ProductCategory.FEMININE_HYGIENE]: 'Feminine Hygiene',
    [ProductCategory.GROOMING]: 'Grooming',
    [ProductCategory.HAIR_CARE]: 'Hair Care',
    [ProductCategory.ORAL_CARE]: 'Oral Care',
    [ProductCategory.FRAGRANCES]: 'Fragrances',
    [ProductCategory.PET_PRODUCT]: 'Pet Product',
    [ProductCategory.CLEANING_ESSENTIALS]: 'Cleaning Essentials',
    [ProductCategory.FOOD_DRINK]: 'Food & Drink',
    [ProductCategory.DIAPERS_WIPES]: 'Diapers & Wipes',
    [ProductCategory.BABY_PRODUCT]: 'Baby Product',
    [ProductCategory.SKIN_CARE]: 'Skin Care',
};

export const getCategoryLabel = (category: ProductCategory): string => {
    return categoryLabels[category] || category;
};

export enum PackagingType {
    BOTTLE = 'BOTTLE',
    STRIP = 'STRIP',
    JAR = 'JAR',
    TUBE = 'TUBE',
    PACKET = 'PACKET',
    BOX = 'BOX',
    SACHET = 'SACHET',
    VIAL = 'VIAL',
    KIT = 'KIT',
    BAG = 'BAG',
}
const packagingLabels: Record<PackagingType, string> = {
    [PackagingType.BOTTLE]: 'Bottle',
    [PackagingType.STRIP]: 'Strip',
    [PackagingType.JAR]: 'Jar',
    [PackagingType.TUBE]: 'Tube',
    [PackagingType.PACKET]: 'Packet',
    [PackagingType.BOX]: 'Box',
    [PackagingType.SACHET]: 'Sachet',
    [PackagingType.VIAL]: 'Vial',
    [PackagingType.KIT]: 'Kit',
    [PackagingType.BAG]: 'Bag',
};

export const getPackagingLabel = (type: PackagingType): string => {
    return packagingLabels[type] || type;
};
