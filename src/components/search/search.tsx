import { Box, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { getProducts } from '../../store/thunks/products';
import { useNavigate } from 'react-router';

function Search() {
	const [search, setSearch] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
		dispatch(getProducts({ searchTerm: e.target.value }));
		navigate('/products');
	}

	return (
		<Box component='form' noValidate autoComplete='off'>
			<TextField
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
		</Box>
	);
}

export default Search;
