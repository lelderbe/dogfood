import { TextField } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useAppDispatch } from '../../store/hooks';
import { filtersActions } from '../../store/slices/filters-slice';
import { useDebounce } from '../../hooks/useDebounce';

function Search() {
	const dispatch = useAppDispatch();
	const [search, setSearch] = useSearch();
	const debouncedValue = useDebounce(search, 300);

	useEffect(() => {
		dispatch(filtersActions.setFilter({ searchTerm: debouncedValue }));
	}, [debouncedValue]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	return (
		<TextField
			autoComplete='off'
			variant='outlined'
			size='small'
			sx={{
				width: '468px',
				height: '48px',
				backgroundColor: '#fff',
				borderRadius: '24px',
			}}
			value={search}
			onChange={handleChange}
		/>
	);
}

export default Search;
