import { useState } from 'react';
import { productsData } from '../products';
import Header from '../components/header';
import Footer from '../components/footer';
import HomePage from '../pages/home-page/home-page';

function App() {
	const [products] = useState<IProduct[]>(productsData.products);

	console.log(products);

	return (
		<>
			<Header />
			<HomePage />
			<Footer />
		</>
	);
}

export default App;
