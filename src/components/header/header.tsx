import { AppBar, IconButton, Container, Badge, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Search from '../search';
import Logo from '../logo';
import ProfileIcon from '../../icons/profile';

function Header() {
	return (
		<AppBar position='static' elevation={0}>
			<Container
				component='div'
				disableGutters
				sx={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Logo />
				<Search />
				<Stack spacing='10px' direction='row' sx={{ color: '#263238' }}>
					<IconButton aria-label='add to favorites'>
						<Badge badgeContent={12} color='success'>
							<FavoriteBorderIcon />
						</Badge>
					</IconButton>
					<IconButton aria-label='shop cart'>
						<ShoppingBagOutlinedIcon />
					</IconButton>
					<IconButton aria-label='open profile'>
						<ProfileIcon />
					</IconButton>
				</Stack>
			</Container>
		</AppBar>
	);
}

export default Header;