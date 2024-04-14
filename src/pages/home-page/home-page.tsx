import { Typography } from '@mui/material';
import CardList from '../../components/card-list';
import { useState } from 'react';
import { productsData } from '../../products';
import Sort from '../../components/sort';

function HomePage() {
	const [products] = useState<IProduct[]>(productsData.products);

	return (
		<>
			<Typography component='p' sx={{ mb: '20px', fontSize: '28px', lineHeight: '32px', fontWeight: '300' }}>
				По запросу{' '}
				<Typography component='span' sx={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800' }}>
					Рога
				</Typography>{' '}
				найдено 7 товаров
			</Typography>
			<Sort />
			<CardList products={products} />
		</>
	);
}

export default HomePage;
