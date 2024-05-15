import { Typography } from '@mui/material';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import { ProfileForm } from '../../components/forms/profile/profile';

const ProfileEditPage = withProtection(() => {
	return (
		<>
			<GoToBackButton />
			<Typography variant='h1' sx={{ mb: '20px' }}>
				Мои данные
			</Typography>
			<ProfileForm />
		</>
	);
});

export default ProfileEditPage;
