import { Typography } from '@mui/material';
import Sort from '../../components/sort';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../store/api/api';
import { ProductsListWithQuery } from '../../components/products-list/products-list';
import { getMessageFromError } from '../../utils/errorUtils';
import { filtersSelectors } from '../../store/slices/filters-slice';
import { useAppSelector } from '../../store/hooks';

const ProductsPage = withProtection(() => {
	const filters = useAppSelector(filtersSelectors.filters);
	const { data, isLoading, isError, error, refetch } = useGetProductsQuery(filters);

	return (
		<>
			<GoToBackButton text='Главная' />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Каталог
			</Typography>
			{filters.searchTerm !== '' && (
				<Typography component='p' sx={{ mb: '20px', fontSize: '28px', lineHeight: '32px', fontWeight: '300' }}>
					По запросу{' '}
					<Typography component='span' sx={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800' }}>
						{filters.searchTerm}
					</Typography>{' '}
					найдено {data?.products?.length || 0} товаров
				</Typography>
			)}
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
