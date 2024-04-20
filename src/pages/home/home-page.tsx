import { Typography, Stack, Button } from '@mui/material';
import promo from './assets/promo.png';
import s from './style.module.css';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function HomePage() {
	return (
		<>
			<Stack direction='row' sx={{ justifyContent: 'space-between', px: '12px', my: '40px' }}>
				<Stack sx={{ maxWidth: '425px' }}>
					<Typography variant='h0' sx={{ mb: '20px' }}>
						Крафтовые лакомства для собак
					</Typography>
					<Typography variant='h2' sx={{ mb: '40px', fontWeight: '300' }}>
						Всегда свежие лакомства ручной <br />
						работы с доставкой по России и <br />
						Миру
					</Typography>
					<Link to='/products'>
						<Button variant='secondary' endIcon={<ArrowForwardIosIcon />} sx={{ py: '14px', px: '26px' }}>
							<Typography variant='h3' sx={{ fontWeight: '700' }}>
								Каталог
							</Typography>
						</Button>
					</Link>
				</Stack>
				<img className={s.promo__img} src={promo} alt='' />
			</Stack>
		</>
	);
}

export default HomePage;
