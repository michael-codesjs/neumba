export const object = (obj: any): obj is Object => {
	return (!!obj) && (obj.constructor === Object);
};

export const array = <T = any>(arr: any): arr is Array<T> => {
	return Array.isArray(arr);
};
