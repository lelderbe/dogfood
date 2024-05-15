import { Typography } from '@mui/material';
import Sort from '../../components/sort';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../store/api/productsApi';
import { ProductsListWithQuery } from '../../components/products-list/products-list';
import { getMessageFromError } from '../../utils/errorUtils';

const ProductsPage = withProtection(() => {
	const { data, isLoading, isError, error, refetch } = useGetProductsQuery({});

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
			<ProductsListWithQuery
				isLoading={isLoading}
				isError={isError}
				queryErrorMsg={getMessageFromError(error, 'Неизвестная ошибка, попробуйте ещё раз')}
				refetch={refetch}
				products={data?.products || []}
			/>
		</>
	);
});

export default ProductsPage;
