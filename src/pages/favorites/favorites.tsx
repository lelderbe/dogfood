import { Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import GoToBackButton from '../../components/go-to-back';

type FavoritesPageProps = {
	products: IProduct[];
	onProductLike: (productData: IProductLikeParams) => Promise<IProduct | undefined>;
	currentUser: IUser | null;
};

const FavoritesPage = ({ products, onProductLike, currentUser }: FavoritesPageProps) => {
	return (
		<>
			<GoToBackButton />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Избранное
			</Typography>
			<ProductsList products={products} onProductLike={onProductLike} currentUser={currentUser} />
		</>
	);
};

export default FavoritesPage;
