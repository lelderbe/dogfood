import { Box, Typography, Stack, Divider, Rating } from '@mui/material';
import { getLocaleDate } from '../../utils/utils';

type IProps = IReview;

function Review({ user, createdAt, rating, text }: IProps) {
	return (
		<Stack mb='20px'>
			<Divider sx={{ mb: '16px' }} />
			<Box mb='8px'>
				<Stack direction='row' gap='8px' alignItems='baseline'>
					<Typography variant='h3'>{user.name}</Typography>
					<Typography variant='p2' color='text.secondary'>
						{getLocaleDate(createdAt)}
					</Typography>
				</Stack>
			</Box>
			<Rating readOnly value={rating} size='small' sx={{ mb: '8px' }} />
			<Typography variant='p2'>{text}</Typography>
		</Stack>
	);
}

export default Review;
