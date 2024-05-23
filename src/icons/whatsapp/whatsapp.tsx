import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as whatsappLogo } from './assets/logo-whatsapp.svg';

function WhatsappIcon() {
	return <SvgIcon component={whatsappLogo} inheritViewBox />;
}

export default WhatsappIcon;
