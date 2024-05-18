import { FC } from 'react';
import { Box, Container, TextField, Typography, Button, Link as LinkMui } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignInFormValues } from './helpers/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from './helpers/validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { paths } from '../../../app/routes';
import { useSignInMutation } from '../../../store/api/api';

export const SignInForm: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [signInRequestFn] = useSignInMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			await signInRequestFn(values).unwrap();
			toast.success('Вы успешно вошли в систему');
			navigate(location.state?.from || paths.products);
		} catch (error) {
			toast.error(getMessageFromError(error, 'Неизвестная ошибка при входе пользователя'));
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
					Вход
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

					<LinkMui component={Link} to={'#'} color='inherit' underline='none'>
						<Typography variant='p2' color='text.secondary'>
							Восстановить пароль
						</Typography>
					</LinkMui>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='primary'
						sx={{ mt: 3, mb: 2 }}>
						Войти
					</LoadingButton>

					<Button component={Link} to={paths.signUp} variant='secondary' fullWidth>
						Регистрация
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
