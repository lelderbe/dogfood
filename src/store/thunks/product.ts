import { createAppAsyncThunk } from '../types';

export const getProduct = createAppAsyncThunk<IProduct, string>(
	'products/getProduct',
	async function (productId, { extra: api }) {
		return await api.getProductById(productId);
	}
);
