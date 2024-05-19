import { Typography } from '@mui/material';
import Sort from '../../components/sort';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../store/api/api';
import { ProductsListWithQuery } from '../../components/products-list/products-list';
import { getMessageFromError } from '../../utils/errorUtils';
import { filtersActions, filtersSelectors } from '../../store/slices/filters-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LoadMore } from '../../components/load-more/load-more';
import { useCallback } from 'react';

const ProductsPage = withProtection(() => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(filtersSelectors.filters);
	const { data, isLoading, isError, error, refetch, isFetching } = useGetProductsQuery(filters);

	const isEndOfList = data && data.products.length >= data.length;

	const loadMoreAction = useCallback(() => {
		if (!isEndOfList) {
			dispatch(filtersActions.nextPage());
		}
	}, [isEndOfList]);

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
					найдено {data?.length || 0} товаров
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
			{!!data?.products?.length && (
				<LoadMore action={loadMoreAction} isLoading={isFetching} isEndOfList={isEndOfList} />
			)}
		</>
	);
});

export default ProductsPage;
