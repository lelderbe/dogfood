import { Card } from '@mui/material';

function ProductDetail(props: IProduct) {
	console.log(props);
	return (
		<Card elevation={0} sx={{ position: 'relative', minWidth: '236px', maxWidth: '236px' }}>
			Product Detail
		</Card>
	);
}

export default ProductDetail;
