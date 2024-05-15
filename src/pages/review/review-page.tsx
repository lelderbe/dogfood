import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import GoToBackButton from '../../components/go-to-back';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { productSelectors } from '../../store/slices/product-slice';
import { getProduct } from '../../store/thunks/product';
import { withProtection } from '../../HOCs/withProtection';
import { ReviewForm } from '../../components/forms';

const ReviewPage = withProtection(() => {
	const { id } = useParams();
	const product = useAppSelector(productSelectors.product);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(getProduct(id));
		}
	}, [id]);

	return (
		<Container>
			<GoToBackButton />
			<Typography variant='h1' mb='20px'>
				Отзыв о товаре {product?.name || ''}
			</Typography>
			{id && <ReviewForm productId={id} />}
		</Container>
	);
});

export default ReviewPage;
