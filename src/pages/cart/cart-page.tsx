import { Typography, Stack } from '@mui/material';
import GoToBackButton from '../../components/go-to-back';
import { withProtection } from '../../HOCs/withProtection';
import CartList from '../../components/cart-list';
import { cartSelectors } from '../../store/slices/cart-slice';
import { useAppSelector } from '../../store/hooks';
import { getCartCount, words } from '../../utils/utils';

const CartPage = withProtection(() => {
	const cart = useAppSelector(cartSelectors.cart);
	const cartItemsCount = getCartCount(cart);

	return (
		<>
			<GoToBackButton />
			{cartItemsCount !== 0 && (
				<Stack direction='row' gap='12px' mb='20px'>
					<Typography variant='h1'>
						{cartItemsCount} {words(cartItemsCount, ['товар', 'товара', 'товаров'])}
					</Typography>
					<Typography variant='h1' fontWeight='regular'>
						{' '}
						в корзине
					</Typography>
				</Stack>
			)}
			<CartList />
		</>
	);
});

export default CartPage;
