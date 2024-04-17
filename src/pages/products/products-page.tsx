import { Container, Typography } from '@mui/material';
import CardList from '../../components/card-list';
import Sort from '../../components/sort';

type ProductsPageProps = {
	products: IProduct[];
	//   onPostLike: (postData: PostLikeParam) => Promise<Post>;
	currentUser: IUser | null;
};

const ProductsPage = ({ products }: ProductsPageProps) => {
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
			{/* <CardList products={products} onPostLike={onPostLike} currentUser={currentUser} /> */}
			<CardList products={products} />
		</Container>
	);
};

export default ProductsPage;
