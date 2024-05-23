import { Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import Sort from '../../components/sort';
import GoToBackButton from '../../components/go-to-back';
import { useContext } from 'react';
import { IProductsContext, ProductsContext } from '../../context/products-context';

const ProductsPage = () => {
	const { products } = useContext(ProductsContext) as IProductsContext;

	return (
		<>
			<GoToBackButton text='Главная' />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Каталог
			</Typography>
			<Typography component='p' sx={{ mb: '20px', fontSize: '28px', lineHeight: '32px', fontWeight: '300' }}>
				По запросу{' '}
				<Typography component='span' sx={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800' }}>
					Рога
				</Typography>{' '}
				найдено 7 товаров
			</Typography>
			<Sort />
			{products && <ProductsList products={products} />}
		</>
	);
};

export default ProductsPage;
