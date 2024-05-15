import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import GoToBackButton from '../../components/go-to-back';
import { useAppDispatch } from '../../store/hooks';
import { productsActions } from '../../store/slices/products-slice';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductByIdQuery } from '../../store/api/productsApi';
import { getMessageFromError } from '../../utils/errorUtils';
import { ProductDetailWithQuery } from '../../components/product-detail/product-detail';

const SingleProductPage = withProtection(() => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { data, isLoading, isError, error, refetch } = useGetProductByIdQuery(id!, { skip: id === undefined });

	function handleProductLike(productData: IProductLikeParams) {
		dispatch(productsActions.changeLikeProduct(productData));
	}

	return (
		<Container>
			<GoToBackButton />
			<ProductDetailWithQuery
				isLoading={isLoading}
				isError={isError}
				queryErrorMsg={getMessageFromError(error, 'Неизвестная ошибка, попробуйте ещё раз')}
				refetch={refetch}
				product={data!}
				onProductLike={handleProductLike}
			/>
		</Container>
	);
});

export default SingleProductPage;
