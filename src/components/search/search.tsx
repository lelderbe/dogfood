import { Box, TextField } from '@mui/material';

function Search() {
	return (
		<Box component='form' noValidate autoComplete='off'>
			<TextField
				id='search'
				label=''
				variant='outlined'
				size='small'
				sx={{
					width: '468px',
					height: '48px',
					backgroundColor: '#fff',
					borderRadius: '24px',
				}}
			/>
		</Box>
	);
}

export default Search;
