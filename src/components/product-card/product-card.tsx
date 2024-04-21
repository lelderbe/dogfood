import { Card, IconButton, Grid, CardMedia, Typography, Button, Link as LinkMui } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import noImageAvailable from './assets/no-image-available.png';
import { SyntheticEvent } from 'react';
import { isLiked } from '../../utils/utils';
import { Link } from 'react-router-dom';

type TProps = {
	onProductLike: (productData: IProductLikeParams) => Promise<IProduct | undefined>;
	currentUser: IUser | null;
} & IProduct;

function ProductCard({ id, images, name, price, wight, likes, onProductLike, currentUser }: TProps) {
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
				<LinkMui component={Link} to={`/product/${id}`} state={{ isBack: true }} underline='none'>
					<CardMedia
						component='img'
						image={images}
						alt={name}
						onError={(e: SyntheticEvent<HTMLImageElement>) => {
							e.currentTarget.src = noImageAvailable;
						}}
						sx={{ width: '187px', height: '187px', margin: '0 auto 30px', objectFit: 'contain' }}
					/>
				</LinkMui>
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
				<Button variant='primary'>В корзину</Button>
			</Card>
		</Grid>
	);
}

export default ProductCard;
