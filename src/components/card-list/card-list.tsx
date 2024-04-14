import { ChangeEvent } from 'react';
import usePagination from '../../hooks/usePagination';
import ProductCard from '../product-card/product-card';
import { Grid, Typography, Stack, Pagination } from '@mui/material';

const PRODUCTS_PER_PAGE = 8;

interface IProps {
	products: IProduct[];
}

function CardList({ products }: IProps) {
	const { getCurrentData, countPages, currentPage, setPagePaginated } = usePagination<IProduct>(
		products,
		PRODUCTS_PER_PAGE
	);

	function handlePageChange(e: ChangeEvent<unknown>, page: number) {
		setPagePaginated(page);
	}

	const productsToShow = getCurrentData();

	if (!productsToShow.length) {
		return (
			<Typography component='p' variant='h6' sx={{ mt: 2 }}>
				No products
			</Typography>
		);
	}

	return (
		<>
			<Grid container rowSpacing={{ xs: 5 }} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: '40px 0' }}>
				{productsToShow.map((item) => {
					return <ProductCard key={item.id} {...item} />;
				})}
			</Grid>
			<Stack spacing={2} sx={{ mt: 2 }} alignItems='center'>
				<Pagination count={countPages} page={currentPage} onChange={handlePageChange} />
			</Stack>
		</>
	);
}

export default CardList;
