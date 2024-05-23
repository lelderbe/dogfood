import { FC } from 'react';
import ProductCard from '../product-card/product-card';
import { Grid, Typography } from '@mui/material';
import { withQuery } from '../../HOCs/withQuery';

interface Props {
	products: IProduct[];
}

const ProductsList: FC<Props> = ({ products }) => {
	if (!products.length) {
		return (
			<Typography component='p' variant='h6' sx={{ mt: 2 }}>
				No products
			</Typography>
		);
	}

	return (
		<Grid container rowSpacing={{ xs: 5 }} columnSpacing={{ xs: 1, sm: 2 }} py='40px'>
			{products.map((item) => {
				return <ProductCard key={item.id} {...item} />;
			})}
		</Grid>
	);
};

export const ProductsListWithQuery = withQuery(ProductsList);

export default ProductsList;
