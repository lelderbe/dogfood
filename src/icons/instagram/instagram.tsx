import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as instagramLogo } from './assets/logo-instagram.svg';

function InstagramIcon() {
	return <SvgIcon component={instagramLogo} inheritViewBox />;
}

export default InstagramIcon;
