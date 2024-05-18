import { Avatar, Button, Typography, Stack, Link as LinkMui } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { userActions, userSelectors } from '../../store/slices/user-slice';
import { useAppDispatch } from '../../store/hooks';
import { userActions } from '../../store/slices/user-slice';
import { withProtection } from '../../HOCs/withProtection';
import { authActions } from '../../store/slices/auth-slice';
import { paths } from '../../app/routes';
import { useGetUserQuery } from '../../store/api/productsApi';

const ProfilePage = withProtection(() => {
	const dispatch = useAppDispatch();
	// const currentUser = useAppSelector(userSelectors.currentUser);
	const { data: currentUser } = useGetUserQuery();
	console.log('ProfilePage:', currentUser);

	function handleLogout() {
		dispatch(userActions.clearUser());
		dispatch(authActions.clearToken());
	}

	return (
		<>
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Профиль
			</Typography>
			<Avatar
				alt={currentUser?.name}
				src={currentUser?.avatarPath ? currentUser?.avatarPath : '/static/images/avatar/1.jpg'}
				sx={{ width: 150, height: 150, mb: '20px' }}
			/>
			<Typography variant='h3' sx={{ mb: '24px' }}>
				{currentUser?.name}
			</Typography>

			<Stack alignItems='flex-start'>
				<LinkMui component={Link} to={paths.editProfile} state={{ isBack: true }} underline='none'>
					<Button variant='secondary' sx={{ mb: '40px' }}>
						Изменить
					</Button>
				</LinkMui>
				<Button variant='secondary' sx={{ alignSelf: 'flex-start' }} onClick={handleLogout}>
					Выйти
				</Button>
			</Stack>
		</>
	);
});

export default ProfilePage;
