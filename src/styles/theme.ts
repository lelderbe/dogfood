import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FFE44D',
		},
		secondary: {
			main: '#1A1A1A',
		},
		success: {
			main: '#01A54E',
		},
		text: {
			primary: '#1A1A1A',
			secondary: '#7B8E98',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 992,
			xl: 1040,
		},
	},
	typography: {
		fontFamily: 'Nunito, Arial',
		fontSize: 16,
		button: {
			fontSize: '16px',
			lineHeight: '20px',
			fontWeight: '700',
			backgroundColor: '#FFE44D',
		},
	},
});

export default theme;
