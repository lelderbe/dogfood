import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
	const [optimizedValue, setOptimizedValue] = useState<T>(value);

	useEffect(() => {
		const id = setTimeout(() => {
			setOptimizedValue(value);
		}, delay);

		return () => clearTimeout(id);
	}, [value, delay]);

	return optimizedValue;
}
