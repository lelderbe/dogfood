import { FC } from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormValues } from './helpers/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from './helpers/validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { useNavigate, Link } from 'react-router-dom';
import { paths } from '../../../app/routes';
import { useSignUpMutation } from '../../../store/api/api';

export const SignUpForm: FC = () => {
	const navigate = useNavigate();
	const [signUpRequestFn] = useSignUpMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			await signUpRequestFn(values).unwrap();
			toast.success('Вы успешно зарегистрированы!');
			navigate(paths.products);
		} catch (error) {
			toast.error(getMessageFromError(error, 'Неизвестная ошибка при регистрации пользователя'));
		}
	};

	return (
		<Container
			component='main'
			maxWidth='xs'
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Typography component='h1' variant='h1'>
					Регистрация
				</Typography>
				<Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submitHandler)}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Email'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Пароль'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<Typography variant='p2' color='text.secondary'>
						Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и
						соглашаетесь на информационную рассылку.
					</Typography>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='primary'
						sx={{ mt: 3, mb: 2 }}>
						Зарегистрироваться
					</LoadingButton>

					<Button component={Link} to={paths.login} variant='secondary' fullWidth>
						Войти
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
