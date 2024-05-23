import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as telegramLogo } from './assets/logo-telegram.svg';

function TelegramIcon() {
	return <SvgIcon component={telegramLogo} inheritViewBox />;
}

export default TelegramIcon;
