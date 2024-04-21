import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		h0: React.CSSProperties;
		p1: React.CSSProperties;
		p2: React.CSSProperties;
		s1: React.CSSProperties;
		s2: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		h0?: React.CSSProperties;
		p1?: React.CSSProperties;
		p2?: React.CSSProperties;
		s1?: React.CSSProperties;
		s2?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		h0: true;
		p1: true;
		p2: true;
		s1: true;
		s2: true;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
	}
}

let theme = createTheme({
	palette: {
		primary: {
			main: '#FFE44D',
			dark: '#FFAA0D',
			light: '#FFF5C0',
		},
		secondary: {
			main: '#1A1A1A',
			// main: '#FFFFFF',
		},
		success: {
			main: '#01A54E',
		},
		text: {
			primary: '#1A1A1A',
			secondary: '#7B8E98',
			// outline: '#CFD8DC',
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
		h0: {
			fontWeight: '900',
			fontSize: '48px',
			lineHeight: '52px',
			letterSpacing: 0,
		},
		h1: {
			fontWeight: '800',
			fontSize: '28px',
			lineHeight: '32px',
			letterSpacing: 0,
		},
		h2: {
			fontWeight: '800',
			fontSize: '24px',
			lineHeight: '28px',
			letterSpacing: 0,
		},
		h3: {
			fontWeight: '800',
			fontSize: '20px',
			lineHeight: '24px',
			letterSpacing: 0,
		},
		p1: {
			fontWeight: '400',
			fontSize: '16px',
			lineHeight: '20px',
			letterSpacing: 0,
		},
		p2: {
			fontWeight: '400',
			fontSize: '14px',
			lineHeight: '20px',
			letterSpacing: 0,
		},
		s1: {
			fontWeight: '400',
			fontSize: '12px',
			lineHeight: '14px',
			letterSpacing: 0,
		},
		s2: {
			fontWeight: '400',
			fontSize: '9px',
			lineHeight: '12px',
			letterSpacing: 0,
		},
	},
});

theme = createTheme(theme, {
	components: {
		MuiButton: {
			defaultProps: {
				color: 'primary',
			},
			styleOverrides: {
				root: {
					padding: '10px 18px',
					fontWeight: '700',
					textTransform: 'none',
					color: theme.palette.text.primary,
				},
			},
			variants: [
				{
					props: { variant: 'primary' },
					style: {
						borderRadius: '55px',
						backgroundColor: theme.palette.primary.main,
					},
				},
				{
					props: { variant: 'secondary' },
					style: {
						borderRadius: '87px',
						border: '1px solid #CFD8DC',
						backgroundColor: '#FFFFFF',
					},
				},
			],
		},
	},
});

export default theme;
