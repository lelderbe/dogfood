import { Avatar, Button, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';

type ProfilePageProps = {
	currentUser: IUser | null;
};

function ProfilePage({ currentUser }: ProfilePageProps) {
	return (
		<Container maxWidth='lg'>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Avatar
						alt={currentUser?.name}
						src={currentUser?.avatarPath ? currentUser.avatarPath : '/static/images/avatar/1.jpg'}
						sx={{ width: 150, height: 150 }}
					/>
					<p>{currentUser?.name}</p>
					<p>{currentUser?.about}</p>

					<Stack>
						<Button variant='outlined'>Редактировать профиль</Button>
						<Button variant='outlined' color='secondary'>
							Изменить аватар
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
}
export default ProfilePage;
