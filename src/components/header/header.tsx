import { AppBar, IconButton, Container, Badge, Stack, Link as LinkMui } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Search from '../search';
import Logo from '../logo';
import ProfileIcon from '../../icons/profile';
import { Link } from 'react-router-dom';
import { authActions, authSelectors } from '../../store/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
	const accessToken = useAppSelector(authSelectors.accessTokenSelector);
	const dispatch = useAppDispatch();

	function handleLogout() {
		dispatch(authActions.clearToken());
	}

	return (
		<AppBar position='static' elevation={0}>
			<Container
				component='div'
				disableGutters
				sx={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<LinkMui component={Link} to={'/'} underline='none'>
					<Logo />
				</LinkMui>
				<Search />
				<Stack spacing='10px' direction='row' sx={{ color: '#263238' }}>
					<LinkMui component={Link} to={'/favorites'} state={{ isBack: true }} underline='none'>
						<IconButton aria-label='favorites'>
							<Badge badgeContent={12} color='success'>
								<FavoriteBorderIcon />
							</Badge>
						</IconButton>
					</LinkMui>
					<IconButton aria-label='shop cart'>
						<ShoppingBagOutlinedIcon />
					</IconButton>
					<LinkMui component={Link} to={'/profile'} underline='none'>
						<IconButton aria-label='open profile'>
							<ProfileIcon />
						</IconButton>
					</LinkMui>
					{!accessToken && (
						<LinkMui component={Link} to={'/login'} underline='none'>
							<IconButton aria-label='login'>
								<LoginIcon />
							</IconButton>
						</LinkMui>
					)}
					{accessToken && (
						<IconButton aria-label='logout' onClick={handleLogout}>
							<LogoutIcon />
						</IconButton>
					)}
				</Stack>
			</Container>
		</AppBar>
	);
}

export default Header;
