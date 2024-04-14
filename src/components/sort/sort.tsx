import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

function Sort() {
	const [value, setValue] = useState(0);

	const handleChange = (e: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				pl: '8px',
				width: '100%',
				boxShadow: '0px 8px 16px 0px rgba(96, 97, 112, 0.16),0px 2px 4px 0px rgba(40, 41, 61, 0.04)',
				borderRadius: '12px',
				overflow: 'hidden',
			}}>
			<Tabs
				onChange={handleChange}
				value={value}
				aria-label='Сортировать по:'
				textColor='secondary'
				sx={{ backgroundColor: 'white' }}>
				<Tab
					label='Популярные'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
				<Tab
					label='Новинки'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
				<Tab
					label='Сначала дешёвые'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
				<Tab
					label='Сначала дорогие'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
				<Tab
					label='По рейтингу'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
				<Tab
					label='По скидке'
					sx={{
						pl: '8px',
						pr: '8px',
						backgroundColor: 'white',
						textTransform: 'none',
						fontSize: '14px',
						lineHeight: '20px',
						fontWeight: '400',
					}}
				/>
			</Tabs>
		</Box>
	);
}

export default Sort;
