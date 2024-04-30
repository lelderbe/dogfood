import { Avatar, Button, Typography, Stack, Link as LinkMui } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';

function ProfilePage() {
	const currentUser = useAppSelector(userSelectors.currentUser);

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
				<LinkMui component={Link} to={'/profile/edit'} state={{ isBack: true }} underline='none'>
					<Button variant='secondary' sx={{ mb: '40px', alignSelf: 'flex-start' }}>
						Изменить
					</Button>
				</LinkMui>
				<Button variant='secondary' sx={{ alignSelf: 'flex-start' }}>
					Выйти
				</Button>
			</Stack>
		</>
	);
}
export default ProfilePage;
