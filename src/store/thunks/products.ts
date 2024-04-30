import { isLiked } from '../../utils/utils';
import { createAppAsyncThunk, RootState } from '../types';
import { getProduct } from './product';

export const getProducts = createAppAsyncThunk<IProduct[], { searchQuery?: string }>(
	'products/getProducts',
	async ({ searchQuery }, { extra: api }) => {
		const products = (await api.getProductsList(searchQuery)).products;
		return products;
	}
);

export const changeLikeProduct = createAppAsyncThunk<IProduct, IProductLikeParams>(
	'products/changeLikeProduct',
	async function (productData, { dispatch, getState, extra: api }) {
		const { currentUser } = (getState() as RootState).user;
		const isProductLiked = isLiked(productData.likes, currentUser?.id);
		await api.changeLikeProductStatus(productData.id, isProductLiked);
		const updatedProduct = await dispatch(getProduct(productData.id)).unwrap();
		return updatedProduct;
	}
);
