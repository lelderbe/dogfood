import { Box, Container, Stack, Typography, Link as LinkMui } from '@mui/material';
import Logo from '../logo';
import TelegramIcon from '../../icons/telegram';
import WhatsappIcon from '../../icons/whatsapp';
import ViberIcon from '../../icons/viber';
import InstagramIcon from '../../icons/instagram';
import VkIcon from '../../icons/vk';
import { Link } from 'react-router-dom';
import { paths } from '../../app/routes';

function Footer() {
	return (
		<Box component='footer' sx={{ pt: '40px', pb: '40px', height: '194px', bgcolor: '#FFE44D' }}>
			<Container component='div' disableGutters sx={{ bgcolor: '#FFE44D', boxShadow: 'none', border: 'none' }}>
				<Stack spacing='140px' direction='row'>
					<Stack spacing='46px'>
						<LinkMui component={Link} to={paths.home} underline='none'>
							<Logo />
						</LinkMui>
						<Typography component='p' sx={{ fontSize: '9px', lineHeight: '12px', fontWeight: '400' }}>
							© «Интернет-магазин DogFood.ru»
						</Typography>
					</Stack>
					<Stack spacing='20px'>
						<LinkMui component={Link} to={paths.products} color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Каталог
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Акции
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Новости
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Отзывы
							</Typography>
						</LinkMui>
					</Stack>
					<Stack spacing='20px'>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Оплата и доставка
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Часто спрашивают
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Обратная связь
							</Typography>
						</LinkMui>
						<LinkMui href='#' color='inherit' underline='none'>
							<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '600' }}>
								Контакты
							</Typography>
						</LinkMui>
					</Stack>
					<Stack spacing='16px'>
						<Typography sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '700' }}>
							Мы на связи
						</Typography>
						<Stack spacing='4px'>
							<LinkMui href='tel:8999000000' color='inherit' underline='none'>
								<Typography sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '700' }}>
									8 (999) 00-00-00
								</Typography>
							</LinkMui>
							<LinkMui href='mailto:dogfood.ru@gmail.com' color='inherit' underline='none'>
								<Typography sx={{ fontSize: '12px', lineHeight: '14px', fontWeight: '400' }}>
									dogfood.ru@gmail.com
								</Typography>
							</LinkMui>
						</Stack>
						<Stack direction='row' spacing='12px'>
							<LinkMui href='#' target='_blank' rel='noreferrer'>
								<TelegramIcon />
							</LinkMui>
							<LinkMui href='#' target='_blank' rel='noreferrer'>
								<WhatsappIcon />
							</LinkMui>
							<LinkMui href='#' target='_blank' rel='noreferrer'>
								<ViberIcon />
							</LinkMui>
							<LinkMui href='#' target='_blank' rel='noreferrer'>
								<InstagramIcon />
							</LinkMui>
							<LinkMui href='#' target='_blank' rel='noreferrer'>
								<VkIcon />
							</LinkMui>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

export default Footer;
