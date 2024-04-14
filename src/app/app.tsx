import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home-page/home-page';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline } from '@mui/material';
import theme from '../styles/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}>
				<CssBaseline />
				<Header />
				<Container component='main' disableGutters sx={{ padding: '20px 0', flex: '1' }}>
					<HomePage />
				</Container>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
