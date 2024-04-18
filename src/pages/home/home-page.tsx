import { Typography, Stack, Button } from '@mui/material';
import promo from './assets/promo.png';
import s from './style.module.css';
import RightArrow from '../../icons/right-arrow';
import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<>
			<Stack direction='row' sx={{ justifyContent: 'space-between', px: '12px', my: '40px' }}>
				<Stack className={s.promo__left}>
					<Typography className={s.title}>Крафтовые лакомства для собак</Typography>
					<Typography className={s.text}>
						Всегда свежие лакомства ручной <br />
						работы с доставкой по России и <br />
						Миру
					</Typography>
					<Link to='/products'>
						<Button className={s.btn_catalog}>
							Каталог
							<RightArrow />
						</Button>
					</Link>
				</Stack>
				<img className={s.promo__img} src={promo} alt='' />
			</Stack>
		</>
	);
}

export default HomePage;
