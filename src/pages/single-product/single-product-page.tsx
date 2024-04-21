import { useEffect, useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import ProductDetail from '../../components/product-detail';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Spinner from '../../components/spinner';
import NotFoundPage from '../not-found';

interface IProps {
	onProductLike: (productData: IProductLikeParams) => Promise<IProduct | undefined>;
	currentUser: IUser | null;
}

const SingleProductPage = ({ currentUser, onProductLike }: IProps) => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { id } = useParams();
	const navigate = useNavigate();

	function handleProductLike(productData: IProductLikeParams) {
		onProductLike(productData)
			.then((updatedProduct) => {
				if (updatedProduct) {
					setProduct(updatedProduct);
				}
			})
			.catch((err) => console.error(err));
	}

	useEffect(() => {
		if (!id) {
			return;
		}

		setIsLoading(true);
		api.getProductById(id)
			.then((dataProduct) => setProduct(dataProduct))
			.catch((err) => {
				console.error(err);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <NotFoundPage />;
	}

	return (
		<Container>
			<Button
				startIcon={<NavigateBeforeIcon sx={{ color: '#7B8E98' }} />}
				sx={{ padding: '3px 0', mb: '4px' }}
				onClick={() => navigate(-1)}>
				<Typography variant='p2' sx={{ color: '#7B8E98' }}>
					Назад
				</Typography>
			</Button>
			{product && <ProductDetail {...product} onProductLike={handleProductLike} currentUser={currentUser} />}
		</Container>
	);
};

export default SingleProductPage;
