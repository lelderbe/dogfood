import { Card, IconButton, Grid, CardMedia, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import noImageAvailable from './assets/no-image-available.png';
import { SyntheticEvent } from 'react';
import { isLiked } from '../../utils/utils';

interface IProps {
	product: IProduct;
	onProductLike: (productData: IProductLikeParams) => void;
	currentUser: IUser | null;
}

function ProductCard({ product, onProductLike, currentUser }: IProps) {
	const { id, images, name, price, wight, likes } = product;

	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		boxShadow: 'none',
		textTransform: 'none',
		padding: '10px 18px',
		border: 'none',
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.primary.main,
		borderRadius: '55px',
		'&:hover': {
			backgroundColor: '#FFAA0D',
			color: '#F44336',
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	}));

	function handleLikeClick() {
		if (likes) {
			onProductLike({ id, likes });
		}
	}

	const isProductLiked = isLiked(likes, currentUser?.id);

	return (
		<Grid item xs={6} sm={4} md={4} lg={3}>
			<Card elevation={0} sx={{ position: 'relative', minWidth: '236px', maxWidth: '236px' }}>
				<IconButton sx={{ position: 'absolute', top: '0px', right: '1px' }} onClick={handleLikeClick}>
					<FavoriteIcon sx={{ fill: isProductLiked ? 'red' : '' }} />
				</IconButton>
				<CardMedia
					component='img'
					image={images}
					alt={name}
					onError={(e: SyntheticEvent<HTMLImageElement>) => {
						e.currentTarget.src = noImageAvailable;
					}}
					sx={{ width: '187px', height: '187px', margin: '0 auto 30px', objectFit: 'contain' }}
				/>
				<Typography component='p' variant='h6' sx={{ fontWeight: 800, mb: '6px' }}>
					{price} ₽
				</Typography>
				<Typography component='p' variant='caption' color='text.secondary' sx={{ mb: '2px', lineHeight: 24 }}>
					{wight}
				</Typography>
				<Typography
					component='p'
					variant='body1'
					sx={{
						fontWeight: 600,
						mb: '16px',
						pr: '20px',
						letterSpacing: 0,
						minHeight: '48px',
						maxHeight: '48px',
						lineHeight: '24px',
						overflow: 'hidden',
					}}>
					{name}
				</Typography>
				<ColorButton>В корзину</ColorButton>
			</Card>
		</Grid>
	);
}

export default ProductCard;
