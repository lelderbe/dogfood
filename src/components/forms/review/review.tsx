import { FC } from 'react';
import { Box, Stack, TextField, Typography, Rating } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReviewFormValues } from './helpers/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { reviewFormSchema } from './helpers/validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { useNavigate } from 'react-router-dom';
import { useCreateProductReviewMutation } from '../../../store/api/productsApi';

interface Props {
	productId: string;
}

export const ReviewForm: FC<Props> = ({ productId }) => {
	const navigate = useNavigate();
	const [createReview] = useCreateProductReviewMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<ReviewFormValues>({
		defaultValues: {
			rating: 3,
			text: '',
		},
		resolver: yupResolver(reviewFormSchema),
	});

	const submitHandler: SubmitHandler<ReviewFormValues> = async (values) => {
		try {
			await createReview({ id: productId, values }).unwrap();
			toast.success('Отзыв добавлен');
			navigate(-1);
		} catch (error) {
			console.log({ error });
			toast.error(getMessageFromError(error, 'Неизвестная ошибка при создании отзыва'));
		}
	};

	return (
		<Box component='form' onSubmit={handleSubmit(submitHandler)} noValidate py='40px'>
			<Stack direction='row' gap='40px' mb='40px'>
				<Typography variant='p1'>Общая оценка</Typography>
				<Controller
					name='rating'
					control={control}
					render={({ field: { value, onChange } }) => (
						<Rating value={value} onChange={(event, newValue) => onChange(newValue)} />
					)}
				/>
			</Stack>

			<Stack direction='row' gap='40px' mb='40px'>
				<Typography variant='p1'>Комментарий</Typography>
				<Controller
					name='text'
					control={control}
					render={({ field }) => (
						<TextField
							placeholder='Поделитесь впечатлениями о товаре'
							multiline
							rows={4}
							fullWidth
							error={!!errors.text?.message}
							helperText={errors.text?.message}
							{...field}
						/>
					)}
				/>
			</Stack>

			<LoadingButton
				type='submit'
				disabled={isSubmitted && (!isValid || isSubmitting)}
				loading={isSubmitting}
				variant='primary'
				sx={{ mt: 3, mb: 2 }}>
				<Typography variant='p1' sx={{ fontWeight: '700' }}>
					Отправить отзыв
				</Typography>
			</LoadingButton>
		</Box>
	);
};
