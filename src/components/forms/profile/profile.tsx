import { FC } from 'react';
import { Box, Stack, Typography, FormControl, Input, InputLabel } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ProfileFormValues } from './helpers/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema } from './helpers/validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../app/routes';
import { useGetUserQuery, useUpdateUserMutation } from '../../../store/api/api';

export const ProfileForm: FC = () => {
	const navigate = useNavigate();
	const { data: user } = useGetUserQuery();
	const [name, surname] = user?.name?.split(' ') || [];
	const [updateUser] = useUpdateUserMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<ProfileFormValues>({
		defaultValues: {
			name: name || '',
			surname: surname || '',
			phone: user?.phone || '',
			email: user?.email || '',
		},
		resolver: yupResolver(profileFormSchema),
	});

	const submitHandler: SubmitHandler<ProfileFormValues> = async (values) => {
		try {
			const profileData = { name: `${values.name} ${values.surname}`, phone: values.phone, email: values.email };
			await updateUser(profileData).unwrap();
			toast.success('Данные обновлены');
			navigate(paths.profile);
		} catch (error) {
			toast.error(getMessageFromError(error, 'Неизвестная ошибка при обновлении профиля'));
		}
	};

	return (
		<Box component='form' noValidate onSubmit={handleSubmit(submitHandler)}>
			<Stack sx={{ mb: '24px' }} gap='12px'>
				<Stack direction='row' gap='12px'>
					<FormControl variant='standard'>
						<InputLabel htmlFor='name'>Имя</InputLabel>
						<Controller
							name='name'
							control={control}
							render={({ field }) => <Input id='name' error={!!errors.name?.message} {...field} />}
						/>
					</FormControl>
					<FormControl variant='standard'>
						<InputLabel htmlFor='surname'>Фамилия</InputLabel>
						<Controller
							name='surname'
							control={control}
							render={({ field }) => <Input id='surname' error={!!errors.surname?.message} {...field} />}
						/>
					</FormControl>
				</Stack>
				<Stack direction='row' gap='12px'>
					<FormControl variant='standard'>
						<InputLabel htmlFor='phone'>Телефон</InputLabel>
						<Controller
							name='phone'
							control={control}
							render={({ field }) => <Input id='phone' error={!!errors.phone?.message} {...field} />}
						/>
					</FormControl>
					<FormControl variant='standard'>
						<InputLabel htmlFor='email'>Почта</InputLabel>
						<Controller
							name='email'
							control={control}
							render={({ field }) => <Input id='email' error={!!errors.email?.message} {...field} />}
						/>
					</FormControl>
				</Stack>
			</Stack>

			<LoadingButton
				type='submit'
				variant='secondary'
				disabled={isSubmitted && (!isValid || isSubmitting)}
				loading={isSubmitting}
				sx={{ mb: '40px', alignSelf: 'flex-start' }}>
				<Typography variant='p1' sx={{ fontWeight: '700' }}>
					Сохранить
				</Typography>
			</LoadingButton>
		</Box>
	);
};