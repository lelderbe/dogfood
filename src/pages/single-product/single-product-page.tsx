import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ProductDetail from '../../components/product-detail';
// const PRODUCT_ID = 'clul0aoyc000314pb4ejq9mav';

type SingleProductPageProps = {
	// onPostDelete: (id: string) => void;
	// onPostLike: ({ id, likes }: PostLikeParam) => Promise<Post>;
	currentUser: IUser | null;
};

const SingleProductPage = ({ currentUser }: SingleProductPageProps) => {
	console.log(currentUser);
	const [product] = useState<IProduct | null>(null);

	// function handleProductLike(dataProduct: PostLikeParam) {
	// 	onPostLike(dataProduct).then((updateProduct) => {
	// 		console.log('updateProduct', updateProduct);
	// 		setPost(updateProduct);
	// 	});
	// }

	useEffect(() => {
		// api.getPostById(POST_ID)
		// 	.then((dataProduct) => setPost(dataProduct))
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, []);

	return (
		<Container>
			<Typography component='h1' variant='h4' textAlign='center' sx={{ mb: 5 }}>
				Product Detail
			</Typography>
			{product && (
				<ProductDetail
					{...product}
					// onPostDelete={onPostDelete}
					// onPostLike={handlePostLike}
					// currentUser={currentUser}
				/>
			)}
		</Container>
	);
};

export default SingleProductPage;
