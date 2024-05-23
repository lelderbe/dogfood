import * as yup from 'yup';

export const signInFormSchema = yup.object({
	email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
	password: yup
		.string()
		.min(6, 'Минимальная длина пароля 6 символов')
		.max(24, 'Максимальная длина пароля 24 символа')
		.required('Это обязательное поле'),
});
