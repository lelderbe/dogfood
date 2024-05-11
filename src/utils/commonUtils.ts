export const objectHasProperty = <P extends PropertyKey>(obj: unknown, prop: P): obj is object & Record<P, unknown> => {
	return typeof obj === 'object' && !!obj && Object.hasOwn(obj, prop);
};

export const fakeFetch = <Data extends object>(data: Data, error: unknown, delay: number) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				return resolve(data);
			}
			return reject(error);
		}, delay);
	});
};
