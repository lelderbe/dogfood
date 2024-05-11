import { useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Box, Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { productsActions } from '../store/slices/products-slice';
import { authSelectors } from '../store/slices/auth-slice';
import { routes } from './routes';

function App() {
	const dispatch = useAppDispatch();
	// const { getCurrentUser } = userActions;
	const { getProducts } = productsActions;
	const accessToken = useAppSelector(authSelectors.accessTokenSelector);
	console.log('accessToken:', accessToken);

	useEffect(() => {
		// dispatch(getCurrentUser());
		dispatch(getProducts({}));
	}, []);

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
					{routes.map((item) => {
						return <Route key={item.path} {...item} />;
					})}
				</Routes>
			</Container>
			<Footer />
		</Box>
	);
}

export default App;
