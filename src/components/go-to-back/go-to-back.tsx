import { Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface IProps {
	text?: string;
}

function GoToBackButton({ text }: IProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const isBack = location.state?.isBack;

	return (
		<Button
			startIcon={<NavigateBeforeIcon sx={{ color: '#7B8E98' }} />}
			sx={{ padding: '3px 0', mb: '4px' }}
			onClick={() => (isBack ? navigate(-1) : navigate('/'))}>
			<Typography variant='p2' sx={{ color: '#7B8E98' }}>
				{text || 'Назад'}
			</Typography>
		</Button>
	);
}

export default GoToBackButton;
