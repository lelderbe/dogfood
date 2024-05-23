import { Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import GoToBackButton from '../../components/go-to-back';
import { isLiked } from '../../utils/utils';
import { useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import { productsSelectors } from '../../store/slices/products-slice';

const FavoritesPage = () => {
	const products = useAppSelector(productsSelectors.products);
	const currentUser = useAppSelector(userSelectors.currentUser);

	const favoriteProducts = products?.filter((item) => isLiked(item.likes, currentUser?.id)) || [];

	return (
		<>
			<GoToBackButton />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Избранное
			</Typography>
			<ProductsList products={favoriteProducts} />
		</>
	);
};

export default FavoritesPage;
