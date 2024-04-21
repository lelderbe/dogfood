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
import { isLiked } from '../utils/utils';

function App() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	useEffect(() => {
		api.getAllInfo()
			.then(([productsData, userInfoData]) => {
				setCurrentUser(userInfoData);
				setProducts(productsData.products);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	async function handleProductLike(productData: IProductLikeParams) {
		try {
			const isProductLiked = isLiked(productData.likes, currentUser?.id);
			await api.changeLikeProductStatus(productData.id, isProductLiked);
			const updateProduct = await api.getProductById(productData.id);
			const newProducts = products.map((currentProduct) =>
				currentProduct.id === updateProduct.id ? updateProduct : currentProduct
			);
			setProducts(newProducts);
			return updateProduct;
		} catch (err) {
			console.error(err);
		}
	}

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
						<Route path='/' element={<HomePage />} />
						<Route path='/profile' element={<ProfilePage currentUser={currentUser} />} />
						<Route
							path='/products'
							element={
								<ProductsPage
									products={products}
									currentUser={currentUser}
									onProductLike={handleProductLike}
								/>
							}
						/>
						<Route
							path='/product/:id'
							element={
								<SingleProductPage
									currentUser={currentUser}
									onProductLike={handleProductLike}
									// onPostDelete={handlePostDelete}
								/>
							}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</Container>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
