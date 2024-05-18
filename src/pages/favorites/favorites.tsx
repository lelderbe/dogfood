import { Typography } from '@mui/material';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { useGetUserQuery } from '../../store/api/api';
import { ProductsListWithQuery } from '../../components/products-list/products-list';
import { getMessageFromError } from '../../utils/errorUtils';

const FavoritesPage = withProtection(() => {
	const { data: currentUser, isLoading, isError, refetch, error } = useGetUserQuery();
	const favoriteProducts = currentUser?.likes?.map((item) => item.product).filter(Boolean) || [];

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
				products={favoriteProducts as IProduct[]}
			/>
		</>
	);
});

export default FavoritesPage;
