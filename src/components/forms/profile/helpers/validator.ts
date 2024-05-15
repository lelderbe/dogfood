import * as yup from 'yup';

export const profileFormSchema = yup.object({
	name: yup.string().max(50).required('Это обязательное поле'),
	surname: yup.string().max(50).required('Это обязательное поле'),
	phone: yup.string().max(20).required('Это обязательное поле'),
	email: yup.string().email().required('Это обязательное поле'),
});
