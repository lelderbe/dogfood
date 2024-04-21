import { Typography } from '@mui/material';
import ProductsList from '../../components/products-list';
import Sort from '../../components/sort';
import GoToBackButton from '../../components/go-to-back';

type ProductsPageProps = {
	products: IProduct[];
	onProductLike: (productData: IProductLikeParams) => Promise<IProduct | undefined>;
	currentUser: IUser | null;
};

const ProductsPage = ({ products, onProductLike, currentUser }: ProductsPageProps) => {
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
			<ProductsList products={products} onProductLike={onProductLike} currentUser={currentUser} />
		</>
	);
};

export default ProductsPage;
