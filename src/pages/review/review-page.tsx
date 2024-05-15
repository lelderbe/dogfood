import { Container, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { ReviewForm } from '../../components/forms';
import { useGetProductByIdQuery } from '../../store/api/productsApi';

const ReviewPage = withProtection(() => {
	const { id } = useParams();
	const { data } = useGetProductByIdQuery(id!, { skip: id === undefined });

	return (
		<Container>
			<GoToBackButton />
			<Typography variant='h1' mb='20px'>
				Отзыв о товаре {data?.name || ''}
			</Typography>
			<Divider />
			{id && <ReviewForm productId={id} />}
		</Container>
	);
});

export default ReviewPage;
