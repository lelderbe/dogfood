import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('q') || '');

	useEffect(() => {
		setSearchParams((params) => {
			if (search === '') {
				params.delete('q');
			} else {
				params.set('q', search);
			}
			return params;
		});
	}, [search]);

	return [search, setSearch] as const;
}
