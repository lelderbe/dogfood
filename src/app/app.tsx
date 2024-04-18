import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home/home-page';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import ProductsPage from '../pages/products';
import ProfilePage from '../pages/profile';
import NotFoundPage from '../pages/not-found';
import SingleProductPage from '../pages/single-product';
import api from '../services/api';
import { Routes, Route } from 'react-router-dom';

function App() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	useEffect(() => {
		api.getAllInfo().then(([productsData, userInfoData]) => {
			setCurrentUser(userInfoData);
			setProducts(productsData.products);
		});
	}, []);

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
					<Routes>
						<Route
							path='/'
							element={
								<HomePage
								// posts={posts}
								// onPostLike={handlePostLike}
								// currentUser={currentUser}
								// onPostDelete={handlePostDelete}
								/>
							}
						/>
						<Route
							path='/product'
							element={
								<SingleProductPage
									// onPostLike={handlePostLike}
									currentUser={currentUser}
									// onPostDelete={handlePostDelete}
								/>
							}
						/>
						<Route path='/profile' element={<ProfilePage currentUser={currentUser} />} />
						<Route
							path='/products'
							element={<ProductsPage products={products} currentUser={currentUser} />}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>

					{/* <ProductsPage products={products} onPostLike={handlePostLike} currentUser={currentUser} /> */}
					{/* <ProductsPage products={products} currentUser={currentUser} /> */}
				</Container>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
