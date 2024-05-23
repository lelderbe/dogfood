import { AppBar, IconButton, Container, Badge, Stack, Link as LinkMui } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Search from '../search';
import Logo from '../logo';
import ProfileIcon from '../../icons/profile';
import { Link } from 'react-router-dom';
import { paths } from '../../app/routes';
import { useGetUserQuery } from '../../store/api/api';
import { useAppSelector } from '../../store/hooks';
import { cartSelectors } from '../../store/slices/cart-slice';
import { getCartCount } from '../../utils/utils';

function Header() {
	const { data: currentUser } = useGetUserQuery();
	const cart = useAppSelector(cartSelectors.cart);

	const cartItemsCount = getCartCount(cart);

	return (
		<AppBar position='static' elevation={0}>
			<Container
				component='div'
				disableGutters
				sx={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<LinkMui component={Link} to={paths.home} underline='none'>
					<Logo />
				</LinkMui>
				<Search />
				<Stack spacing='10px' direction='row' sx={{ color: '#263238' }}>
					<LinkMui component={Link} to={paths.favorites} state={{ isBack: true }} underline='none'>
						<IconButton aria-label='favorites'>
							<Badge badgeContent={currentUser?.likes?.length} color='success'>
								<FavoriteBorderIcon />
							</Badge>
						</IconButton>
					</LinkMui>
					<LinkMui component={Link} to={paths.cart} state={{ isBack: true }} underline='none'>
						<IconButton aria-label='shop cart'>
							<Badge badgeContent={cartItemsCount} color='success'>
								<ShoppingBagOutlinedIcon />
							</Badge>
						</IconButton>
					</LinkMui>
					<LinkMui component={Link} to={paths.profile} underline='none'>
						<IconButton aria-label='open profile'>
							<ProfileIcon />
						</IconButton>
					</LinkMui>
				</Stack>
			</Container>
		</AppBar>
	);
}

export default Header;
