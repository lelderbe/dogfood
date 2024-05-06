import { FC } from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormValues } from './helpers/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from './helpers/validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { getMessageFromError } from '../../../utils/errorUtils';
// import { useSignUpMutation } from '../../../storage/api/authApi';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../../storage/slices/userSlice';
// import { setAccessToken } from '../../../storage/slices/authSlice';
// import { formHandler } from 'utils/forms';

export const SignUpForm: FC = () => {
	// const dispatch = useDispatch();
	// navigate поможет сделать редирект в нужный момент
	// const navigate = useNavigate();
	// Из хука useSignUpMutation (был получен путем автогенерации)
	// достаем функцию, которая будет (регистрировать пользователя) делать POST-запрос к нашем серверу)
	// const [signUpRequestFn] = useSignUpMutation();
	// инициализируем react-hook-form
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
		console.log('values:', values);
		try {
			// метод "unwrap" помогает убрать вспомогательные обертки
			// RTK, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
			// с помощью конструкции try...catch. В этом случае нам так удобней
			// const response = await signUpRequestFn(values).unwrap();

			// dispatch(setUser(response.user));
			// dispatch(setAccessToken({ accessToken: response.accessToken }));

			// Выводим уведомление, что пользователь успешно зарегался
			// Есть куча библиотек для отображения "Тостеров". Мы используем
			// react-toastify — https://github.com/fkhadra/react-toastify#readme
			toast.success('Вы успешно зарегистрированы!');
			// navigate('/');
		} catch (error) {
			// Если произошла ошибка, то выводим уведомление
			console.log({ error });
			// toast.error(
			// 	getMessageFromError(
			// 		error,
			// 		'Не известная ошибка при регистрации пользователя'
			// 	)
			// );
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
				<Box component='form' onSubmit={handleSubmit(submitHandler)} noValidate sx={{ mt: 1 }}>
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
						// кнопка становится недоступной после первой валидации (если есть ошибки)
						// или когда выполняется отправка (чтобы не дать пользователю отправить форму несколько раз)
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='primary'
						sx={{ mt: 3, mb: 2 }}>
						Зарегистрироваться
					</LoadingButton>

					<Button variant='secondary' fullWidth>
						Войти
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
