import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography, Stack, CardMedia, Button, Link as LinkMui } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { isLiked } from '../../utils/utils';
import { useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import Review from '../review';
import { Link } from 'react-router-dom';

type TProps = {
	onProductLike: (productData: IProductLikeParams) => void;
} & IProduct;

function ProductDetail({ id, name, images, price, likes, onProductLike, reviews }: TProps) {
	const currentUser = useAppSelector(userSelectors.currentUser);

	function handleLikeClick() {
		if (likes) {
			onProductLike({ id, likes });
		}
	}

	const isProductLiked = isLiked(likes, currentUser?.id);

	return (
		<Box>
			<Typography variant='h1'>{name}</Typography>
			<Typography variant='p2'>Артикул: 2388907</Typography>
			<Stack direction='row' gap='40px'>
				<CardMedia component='img' image={images} alt={name} sx={{ width: '488px' }} />
				<Box></Box>
				<Stack sx={{ minWidth: '343px' }}>
					<Typography variant='h1' sx={{ mb: '24px' }}>
						{price} ₽
					</Typography>
					<Button variant='text' sx={{ mb: '24px', justifyContent: 'flex-start' }} onClick={handleLikeClick}>
						<Stack direction='row' gap='8px' alignItems='center'>
							<FavoriteIcon fontSize='small' sx={{ fill: isProductLiked ? 'red' : '' }} />
							<Typography variant='p1'>В избранное</Typography>
						</Stack>
					</Button>
					<Stack
						direction='row'
						gap='8px'
						sx={{ padding: '12px', mb: '8px', backgroundColor: '#ECEFF180', borderRadius: '12px' }}>
						<LocalShippingOutlinedIcon fontSize='large' />
						<Stack gap='8px'>
							<Typography variant='p1' fontWeight='bold'>
								Доставка по всему Миру!
							</Typography>
							<Typography variant='p2'>Доставка курьером — от 399 ₽</Typography>
							<Typography variant='p2'>Доставка в пункт выдачи — от 199 ₽</Typography>
						</Stack>
					</Stack>
					<Stack
						direction='row'
						gap='8px'
						sx={{ padding: '12px', backgroundColor: '#ECEFF180', borderRadius: '12px' }}>
						<LocalShippingOutlinedIcon fontSize='large' />
						<Stack gap='8px'>
							<Typography variant='p1' fontWeight='bold'>
								Гарантия качества
							</Typography>
							<Typography variant='p2'>
								Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все
								возможное, чтобы удовлетворить ваши нужды.
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Typography variant='h2' mb='20px'>
				Описание
			</Typography>
			<Typography variant='p1' component='p' sx={{ mb: '40px' }}>
				Бублик из бычьего корня-забавная, интересная, вкусная, а главное полезная вкусняшка для вашего любимца.
				Неповторимый вкус этого лакомства надолго отвлечет Вашего питомца от любых дел.
			</Typography>
			<Typography variant='h2' mb='20px'>
				Характеристики
			</Typography>
			<Typography variant='h2' mb='20px'>
				Отзывы
			</Typography>
			<LinkMui component={Link} to={`/reviews/leave/${id}`} state={{ isBack: true }} underline='none'>
				<Button variant='secondary' sx={{ mb: '20px' }}>
					<Typography variant='p1' sx={{ fontWeight: '700' }}>
						Написать отзыв
					</Typography>
				</Button>
			</LinkMui>
			{reviews?.map((item) => {
				return <Review key={item.id} {...item} />;
			})}
		</Box>
	);
}

export default ProductDetail;
