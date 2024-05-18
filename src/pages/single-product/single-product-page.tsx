import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductByIdQuery } from '../../store/api/api';
import { getMessageFromError } from '../../utils/errorUtils';
import { ProductDetailWithQuery } from '../../components/product-detail/product-detail';

const SingleProductPage = withProtection(() => {
	const { id } = useParams();
	const { data, isLoading, isError, error, refetch } = useGetProductByIdQuery(id!, { skip: id === undefined });

	return (
		<Container>
			<GoToBackButton />
			<ProductDetailWithQuery
				isLoading={isLoading}
				isError={isError}
				queryErrorMsg={getMessageFromError(error, 'Неизвестная ошибка, попробуйте ещё раз')}
				refetch={refetch}
				product={data!}
			/>
		</Container>
	);
});

export default SingleProductPage;
