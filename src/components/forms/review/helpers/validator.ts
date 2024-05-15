import * as yup from 'yup';

export const reviewFormSchema = yup.object({
	rating: yup.number().min(1).max(5).required('Это обязательное поле'),
	text: yup.string().max(1000).required('Это обязательное поле'),
});
