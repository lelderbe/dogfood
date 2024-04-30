import { useEffect } from 'react';
import { Container } from '@mui/material';
import ProductDetail from '../../components/product-detail';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';
import NotFoundPage from '../not-found';
import GoToBackButton from '../../components/go-to-back';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { productSelectors } from '../../store/slices/product-slice';
import { getProduct } from '../../store/thunks/product';
import { RequestStatus } from '../../store/types';
import { productsActions } from '../../store/slices/products-slice';

const SingleProductPage = () => {
	const { id } = useParams();
	const product = useAppSelector(productSelectors.product);
	const status = useAppSelector(productSelectors.status);
	const dispatch = useAppDispatch();

	function handleProductLike(productData: IProductLikeParams) {
		dispatch(productsActions.changeLikeProduct(productData));
	}

	useEffect(() => {
		if (!id) {
			return;
		}

		dispatch(getProduct(id));
	}, [id]);

	if (status === RequestStatus.LOADING) {
		return <Spinner />;
	}

	if (status === RequestStatus.FAILED) {
		return <NotFoundPage />;
	}

	return (
		<Container>
			<GoToBackButton />
			{product && <ProductDetail {...product} onProductLike={handleProductLike} />}
		</Container>
	);
};

export default SingleProductPage;
