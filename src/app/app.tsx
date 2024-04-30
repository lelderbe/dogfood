import { useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home/home-page';
import { Box, Container, CssBaseline } from '@mui/material';
import ProductsPage from '../pages/products';
import ProfilePage from '../pages/profile';
import NotFoundPage from '../pages/not-found';
import SingleProductPage from '../pages/single-product';
import { Routes, Route } from 'react-router-dom';
import FavoritesPage from '../pages/favorites';
import ProfileEditPage from '../pages/profile-edit';
import { userActions } from '../store/slices/user-slice';
import { useAppDispatch } from '../store/hooks';
import { productsActions } from '../store/slices/products-slice';

function App() {
	const dispatch = useAppDispatch();
	const { getCurrentUser } = userActions;
	const { getProducts } = productsActions;

	useEffect(() => {
		dispatch(getCurrentUser());
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
					<Route path='/' element={<HomePage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/profile/edit' element={<ProfileEditPage />} />
					<Route path='/favorites' element={<FavoritesPage />} />
					<Route path='/products' element={<ProductsPage />} />
					<Route path='/product/:id' element={<SingleProductPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Container>
			<Footer />
		</Box>
	);
}

export default App;
