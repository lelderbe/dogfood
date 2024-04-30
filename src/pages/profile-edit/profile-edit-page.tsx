import { Button, Typography, Stack, FormControl, InputLabel, Input, Box } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import GoToBackButton from '../../components/go-to-back';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import { updateCurrentUser } from '../../store/thunks/user';
import { useNavigate } from 'react-router';

function ProfileEditPage() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(userSelectors.currentUser);
	const [name, surname] = currentUser?.name.split(' ') || [];
	const [form, setForm] = useState({
		name: name || '',
		surname: surname || '',
		phone: currentUser?.phone || '',
		email: currentUser?.email || '',
	});
	const navigate = useNavigate();

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	function handleProfileSave(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		const profileData = { name: `${form.name} ${form.surname}`, phone: form.phone, email: form.email };
		dispatch(updateCurrentUser(profileData));
		navigate('/profile');
	}

	return (
		<>
			<GoToBackButton />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Мои данные
			</Typography>
			<Box component='form' onSubmit={handleProfileSave}>
				<Stack sx={{ mb: '24px' }} gap='12px'>
					<Stack direction='row' gap='12px'>
						<FormControl variant='standard'>
							<InputLabel htmlFor='name'>Имя</InputLabel>
							<Input value={form.name} name='name' id='name' onChange={onInputChange} />
						</FormControl>
						<FormControl variant='standard'>
							<InputLabel htmlFor='surname'>Фамилия</InputLabel>
							<Input value={form.surname} name='surname' id='surname' onChange={onInputChange} />
						</FormControl>
					</Stack>
					<Stack direction='row' gap='12px'>
						<FormControl variant='standard'>
							<InputLabel htmlFor='phone'>Телефон</InputLabel>
							<Input value={form.phone} name='phone' id='phone' onChange={onInputChange} />
						</FormControl>
						<FormControl variant='standard'>
							<InputLabel htmlFor='email'>Почта</InputLabel>
							<Input value={form.email} name='email' id='email' onChange={onInputChange} />
						</FormControl>
					</Stack>
				</Stack>
				<Button type='submit' variant='secondary' sx={{ mb: '40px', alignSelf: 'flex-start' }}>
					Сохранить
				</Button>
			</Box>
		</>
	);
}
export default ProfileEditPage;
