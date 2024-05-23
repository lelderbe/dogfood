import { IconButton, CardMedia, Stack, Typography, Button, Link as LinkMui, Box, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/api/api';
import { useAppDispatch } from '../../store/hooks';
import { CartItem, cartActions } from '../../store/slices/cart-slice';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Spinner from '../spinner';

function CartItem({ id, count, checked }: CartItem) {
	const dispatch = useAppDispatch();
	const { data: product } = useGetProductByIdQuery(id);

	function handleRemoveItem() {
		dispatch(cartActions.removeProduct(id));
	}

	function handleSelectProduct() {
		dispatch(cartActions.toggleProductCheck(id));
	}

	if (!product) {
		return <Spinner />;
	}

	return (
		<Stack direction='row' alignItems='center'>
			<Checkbox checked={checked} size='small' onChange={handleSelectProduct} />

			<LinkMui component={Link} to={`/product/${id}`} state={{ isBack: true }}>
				<CardMedia
					component='img'
					image={product.images}
					alt={product.name}
					sx={{ width: '62px', mr: '16px' }}
				/>
			</LinkMui>

			<Stack gap='8px' sx={{ minWidth: '244px', maxWidth: '244px', mr: '24px' }}>
				<LinkMui
					component={Link}
					to={`/product/${id}`}
					state={{ isBack: true }}
					underline='none'
					color='text.primary'>
					<Typography variant='p2' fontWeight='bold'>
						{product.name}
					</Typography>
				</LinkMui>
				<Typography variant='s1' color='text.secondary'>
					{product.description}
				</Typography>
			</Stack>

			<Box
				display='flex'
				width='109px'
				height='48px'
				alignItems='center'
				justifyContent='space-around'
				sx={{
					border: '1px solid rgb(207, 216, 220)',
					borderRadius: '100px',
				}}>
				<Button
					variant='text'
					disabled={count === 1}
					sx={{
						fontSize: '21px',
						fontWeight: '700',
						color: 'rgb(26, 26, 26)',
						padding: '0',
						minWidth: '24px',
					}}
					onClick={() => dispatch(cartActions.decreaseProductCount(id))}>
					{' '}
					-
				</Button>{' '}
				<Typography variant='p1' fontWeight={800}>
					{count}
				</Typography>
				<Button
					variant='text'
					disabled={count === product.stock}
					sx={{
						fontSize: '21px',
						fontWeight: '700',
						color: 'rgb(26, 26, 26)',
						padding: '0',
						minWidth: '24px',
					}}
					onClick={() => dispatch(cartActions.increaseProductCount(id))}>
					{' '}
					+
				</Button>{' '}
			</Box>

			<Stack justifyContent='flex-end' alignItems='flex-end' sx={{ minWidth: '92px', mr: '24px' }}>
				{!!product.discount && (
					<Typography variant='p2' fontWeight={700} sx={{ textDecoration: 'line-through' }}>
						{product.price * count} ₽
					</Typography>
				)}
				<Typography variant='h3' color={product.discount ? '#F44336' : '#1A1A1A'}>
					{(product.price - product.discount) * count} ₽
				</Typography>
			</Stack>

			<IconButton aria-label='remove product' onClick={handleRemoveItem}>
				<DeleteForeverOutlinedIcon />
			</IconButton>
		</Stack>
	);
}

export default CartItem;
