import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home/home-page';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import ProductsPage from '../pages/products';
import ProfilePage from '../pages/profile';
import NotFoundPage from '../pages/not-found';
import { useState } from 'react';
import { productsData } from '../products';
import SingleProductPage from '../pages/single-product';

function App() {
	const [products] = useState<IProduct[]>(productsData.products);
	const currentUser = null;

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
					{/* <ProductsPage products={products} onPostLike={handlePostLike} currentUser={currentUser} /> */}
					<ProductsPage products={products} currentUser={currentUser} />
					<SingleProductPage
						// onPostLike={handlePostLike}
						// onPostDelete={handlePostDelete}
						currentUser={currentUser}
					/>
					<ProfilePage currentUser={currentUser} />
					<NotFoundPage />
				</Container>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
