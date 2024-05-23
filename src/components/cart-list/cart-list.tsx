import React, { FC } from 'react';
import { Grid, Typography, Divider, Box, Paper, Stack, Button } from '@mui/material';
import { withQuery } from '../../HOCs/withQuery';
import { useAppSelector } from '../../store/hooks';
import { cartSelectors } from '../../store/slices/cart-slice';
import CartItem from '../cart-item';
import { getCartCount } from '../../utils/utils';

const CartList: FC = () => {
	const cart = useAppSelector(cartSelectors.cart);
	const cartItemsCount = getCartCount(cart);

	const productsPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);
	const productsDiscount = cart.reduce((acc, item) => acc + item.discount * item.count, 0);
	const totalPrice = productsPrice - productsDiscount;

	if (!cart.length) {
		return (
			<Typography component='p' variant='h6' sx={{ mt: 2 }}>
				Ваша корзина пуста
			</Typography>
		);
	}

	return (
		<Grid container columnSpacing={{ xs: 1, sm: '60px' }}>
			<Grid item xs={8}>
				{cart.map((item, index) => {
					return (
						<React.Fragment key={item.id}>
							<Box>
								<CartItem {...item} />
								{index < cart.length - 1 && <Divider sx={{ my: '24px' }} />}
							</Box>
						</React.Fragment>
					);
				})}
			</Grid>
			<Grid item xs={4}>
				<Paper elevation={3} sx={{ padding: '16px', borderRadius: '20px' }}>
					<Typography component='p' variant='h3' mb='24px'>
						Ваша корзина
					</Typography>
					<Stack mb='16px' direction='row' justifyContent='space-between'>
						<Typography component='p' variant='p2' color='text.secondary'>
							Товары ({cartItemsCount})
						</Typography>
						<Typography component='p' variant='p2' fontWeight={600}>
							{productsPrice} ₽
						</Typography>
					</Stack>
					<Stack mb='16px' direction='row' justifyContent='space-between'>
						<Typography component='p' variant='p2' color='text.secondary'>
							Скидка
						</Typography>
						<Typography component='p' variant='p2' color='#F44336' fontWeight={600}>
							- {productsDiscount} ₽
						</Typography>
					</Stack>
					<Divider sx={{ mb: '16px' }} />
					<Stack mb='16px' direction='row' justifyContent='space-between'>
						<Typography component='p' variant='p2' fontWeight={800}>
							Общая стоимость
						</Typography>
						<Typography component='p' variant='h3'>
							{totalPrice} ₽
						</Typography>
					</Stack>
					<Button variant='primary' fullWidth>
						Оформить заказ
					</Button>
				</Paper>
			</Grid>
		</Grid>
	);
};

export const CartListWithQuery = withQuery(CartList);

export default CartList;
