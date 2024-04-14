import { Box, Container, Stack, Typography, Link } from '@mui/material';
import Logo from '../logo';
import TelegramIcon from '../../icons/telegram';
import WhatsappIcon from '../../icons/whatsapp';
import ViberIcon from '../../icons/viber';
import InstagramIcon from '../../icons/instagram';
import VkIcon from '../../icons/vk';

function Footer() {
	return (
		<Box component='footer' sx={{ pt: '40px', pb: '40px', height: '194px', bgcolor: '#FFE44D' }}>
			<Container component='div' disableGutters sx={{ bgcolor: '#FFE44D', boxShadow: 'none', border: 'none' }}>
				<Stack spacing='140px' direction='row'>
					<Stack spacing='46px'>
						<Logo />
						<Typography component='p' sx={{ fontSize: '9px', lineHeight: '12px', fontWeight: '400' }}>
							© «Интернет-магазин DogFood.ru»
						</Typography>
					</Stack>
					<Stack spacing='20px'>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Каталог
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Акции
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Новости
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Отзывы
							</Typography>
						</Link>
					</Stack>
					<Stack spacing='20px'>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Оплата и доставка
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Часто спрашивают
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Обратная связь
							</Typography>
						</Link>
						<Link href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Контакты
							</Typography>
						</Link>
					</Stack>
					<Stack spacing='16px'>
						<Typography sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '700' }}>
							Мы на связи
						</Typography>
						<Stack spacing='4px'>
							<Link href='tel:8999000000' color='inherit' underline='none'>
								<Typography sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '700' }}>
									8 (999) 00-00-00
								</Typography>
							</Link>
							<Link href='mailto:dogfood.ru@gmail.com' color='inherit' underline='none'>
								<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '400' }}>
									dogfood.ru@gmail.com
								</Typography>
							</Link>
						</Stack>
						<Stack direction='row' spacing='12px'>
							<Link href='#' target='_blank' rel='noreferrer'>
								<TelegramIcon />
							</Link>
							<Link href='#' target='_blank' rel='noreferrer'>
								<WhatsappIcon />
							</Link>
							<Link href='#' target='_blank' rel='noreferrer'>
								<ViberIcon />
							</Link>
							<Link href='#' target='_blank' rel='noreferrer'>
								<InstagramIcon />
							</Link>
							<Link href='#' target='_blank' rel='noreferrer'>
								<VkIcon />
							</Link>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

export default Footer;
