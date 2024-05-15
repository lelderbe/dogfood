import Header from '../components/header';
import Footer from '../components/footer';
import { Box, Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { useCurrentUser } from '../hooks/useCurrentUser';

function App() {
	useCurrentUser();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}>
			<CssBaseline />
			<Header />
			<Container component='main' disableGutters sx={{ padding: '20px 0', flex: '1' }}>
				<Routes>
					{routes.map((item) => (
						<Route key={item.path} {...item} />
					))}
				</Routes>
			</Container>
			<Footer />
		</Box>
	);
}

export default App;
