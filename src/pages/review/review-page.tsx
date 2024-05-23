import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Typography, Box, Stack, TextField, Button, Rating } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import GoToBackButton from '../../components/go-to-back';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { productSelectors } from '../../store/slices/product-slice';
import { getProduct } from '../../store/thunks/product';
import { createProductReview } from '../../store/thunks/products';
import { withProtection } from '../../HOCs/withProtection';

const ReviewPage = withProtection(() => {
	const { id } = useParams();
	const product = useAppSelector(productSelectors.product);
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		rating: 3,
		text: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			return;
		}

		dispatch(getProduct(id));
	}, [id]);

	function handleChangeText(e: ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmitReview() {
		dispatch(createProductReview({ ...form, id: id as string })).then(() => navigate(-1));
	}

	return (
		<Container>
			<GoToBackButton />
			<Typography variant='h1' mb='20px'>
				Отзыв о товаре {product?.name || ''}
			</Typography>
			<Box py='40px'>
				<Stack direction='row' gap='40px' mb='40px'>
					<Typography variant='p1'>Общая оценка</Typography>
					<Rating
						name='rating'
						value={form.rating}
						onChange={(event, newValue) => {
							setForm((prev) => ({ ...prev, rating: newValue || prev.rating }));
						}}
					/>
				</Stack>
				<Stack direction='row' gap='40px' mb='40px'>
					<Typography variant='p1'>Комментарий</Typography>
					<TextField
						name='text'
						placeholder='Поделитесь впечатлениями о товаре'
						multiline
						rows={4}
						fullWidth
						value={form.text}
						onChange={handleChangeText}
					/>
				</Stack>
				<Button variant='primary' onClick={handleSubmitReview}>
					<Typography variant='p1' sx={{ fontWeight: '700' }}>
						Отправить отзыв
					</Typography>
				</Button>
			</Box>
		</Container>
	);
});

export default ReviewPage;
