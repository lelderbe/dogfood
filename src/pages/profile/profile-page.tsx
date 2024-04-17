import { Avatar, Button, Typography } from '@mui/material';
import s from './style.module.css';

type ProfilePageProps = {
	currentUser: IUser | null;
};

function ProfilePage({ currentUser }: ProfilePageProps) {
	return (
		<>
			<Typography className={s.title}>Профиль</Typography>
			<Avatar
				alt={currentUser?.name}
				src={currentUser?.avatarPath ? currentUser.avatarPath : '/static/images/avatar/1.jpg'}
				sx={{ width: 150, height: 150, mb: '20px' }}
			/>
			<Typography className={s.name}>{currentUser && currentUser.name}</Typography>
			<Button className={s.btn} sx={{ mb: '40px' }}>
				Изменить
			</Button>
			<Button className={s.btn}>Выйти</Button>
		</>
	);
}
export default ProfilePage;
