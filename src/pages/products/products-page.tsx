import { Container, Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import Sort from '../../components/sort';

type ProductsPageProps = {
	products: IProduct[];
	onProductLike: (productData: IProductLikeParams) => void;
	currentUser: IUser | null;
};

const ProductsPage = ({ products, onProductLike, currentUser }: ProductsPageProps) => {
	return (
		<Container disableGutters component='main' sx={{ pt: 8, pb: 6 }}>
			<Typography component='p' sx={{ mb: '20px', fontSize: '28px', lineHeight: '32px', fontWeight: '300' }}>
				По запросу{' '}
				<Typography component='span' sx={{ fontSize: '28px', lineHeight: '32px', fontWeight: '800' }}>
					Рога
				</Typography>{' '}
				найдено 7 товаров
			</Typography>
			<Sort />
			<ProductsList products={products} onProductLike={onProductLike} currentUser={currentUser} />
		</Container>
	);
};

export default ProductsPage;
