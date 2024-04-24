import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home/home-page';
import { Box, Container, CssBaseline } from '@mui/material';
import ProductsPage from '../pages/products';
import ProfilePage from '../pages/profile';
import NotFoundPage from '../pages/not-found';
import SingleProductPage from '../pages/single-product';
import api from '../services/api';
import { Routes, Route } from 'react-router-dom';
import { isLiked } from '../utils/utils';
import FavoritesPage from '../pages/favorites';
import { UserContext } from '../context/user-context';
import { ProductsContext } from '../context/products-context';

function App() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	useEffect(() => {
		api.getAllInfo()
			.then(([productsData, userInfoData]) => {
				setProducts(productsData.products);
				setCurrentUser(userInfoData);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	async function handleProductLike(productData: IProductLikeParams) {
		try {
			const isProductLiked = isLiked(productData.likes, currentUser?.id);
			await api.changeLikeProductStatus(productData.id, isProductLiked);
			const updatedProduct = await api.getProductById(productData.id);
			const newProducts = products.map((currentProduct) =>
				currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct
			);
			setProducts(newProducts);
			return updatedProduct;
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<UserContext.Provider value={currentUser}>
			<ProductsContext.Provider value={{ products, onProductLike: handleProductLike }}>
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
							<Route path='/favorites' element={<FavoritesPage />} />
							<Route path='/products' element={<ProductsPage />} />
							<Route path='/product/:id' element={<SingleProductPage />} />
							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</Container>
					<Footer />
				</Box>
			</ProductsContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
