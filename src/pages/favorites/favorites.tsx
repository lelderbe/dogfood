import { Typography } from '@mui/material';
import GoToBackButton from '../../components/go-to-back';
import { isLiked } from '../../utils/utils';
import { useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../store/api/productsApi';
import { ProductsListWithQuery } from '../../components/products-list/products-list';
import { getMessageFromError } from '../../utils/errorUtils';

const FavoritesPage = withProtection(() => {
	const currentUser = useAppSelector(userSelectors.currentUser);
	const { data, isLoading, isError, error, refetch } = useGetProductsQuery({});

	const favoriteProducts = data?.products?.filter((item) => isLiked(item.likes, currentUser?.id)) || [];

	return (
		<>
			<GoToBackButton />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Избранное
			</Typography>
			<ProductsListWithQuery
				isLoading={isLoading}
				isError={isError}
				queryErrorMsg={getMessageFromError(error, 'Неизвестная ошибка, попробуйте ещё раз')}
				refetch={refetch}
				products={favoriteProducts}
			/>
		</>
	);
});

export default FavoritesPage;
