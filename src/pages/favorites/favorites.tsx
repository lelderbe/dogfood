import { Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import GoToBackButton from '../../components/go-to-back';
import { useContext } from 'react';
import { IProductsContext, ProductsContext } from '../../context/products-context';
import { UserContext } from '../../context/user-context';
import { isLiked } from '../../utils/utils';

const FavoritesPage = () => {
	const { products } = useContext(ProductsContext) as IProductsContext;
	const currentUser = useContext(UserContext);

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
