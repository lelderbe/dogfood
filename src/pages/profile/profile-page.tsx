import { Avatar, Button, Typography, Stack } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';

function ProfilePage() {
	const currentUser = useContext(UserContext);

	return (
		<>
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Профиль
			</Typography>
			<Avatar
				alt={currentUser?.name}
				src={currentUser?.avatarPath ? currentUser.avatarPath : '/static/images/avatar/1.jpg'}
				sx={{ width: 150, height: 150, mb: '20px' }}
			/>
			<Typography variant='h3' sx={{ mb: '24px' }}>
				{currentUser && currentUser.name}
			</Typography>
			<Stack>
				<Button variant='secondary' sx={{ mb: '40px', alignSelf: 'flex-start' }}>
					Изменить
				</Button>
				<Button variant='secondary' sx={{ alignSelf: 'flex-start' }}>
					Выйти
				</Button>
			</Stack>
		</>
	);
}
export default ProfilePage;
