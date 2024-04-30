import { createSlice } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../utils/store';
import { RequestStatus } from '../types';
import { changeLikeProduct, getProducts, createProductReview } from '../thunks/products';

interface IProductsState {
	products: IProduct[];
	status: RequestStatus;
}

const initialState: IProductsState = {
	products: [],
	status: RequestStatus.IDLE,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		setOnProductLike: (state, action) => {
			state.products = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.status = RequestStatus.SUCCESS;
			})
			.addCase(changeLikeProduct.fulfilled, (state, action) => {
				state.products = state.products.map((currentProduct) =>
					currentProduct.id === action.payload.id ? action.payload : currentProduct
				);
				state.status = RequestStatus.SUCCESS;
			})
			.addCase(createProductReview.fulfilled, (state, action) => {
				state.products = state.products.map((currentProduct) => {
					if (currentProduct.id === action.payload.product.id) {
						currentProduct.reviews?.push(action.payload);
					}
					return currentProduct;
				});
				state.status = RequestStatus.SUCCESS;
			})
			.addMatcher(isActionPending(productsSlice.name), (state) => {
				state.status = RequestStatus.LOADING;
			})
			.addMatcher(isActionRejected(productsSlice.name), (state) => {
				state.status = RequestStatus.FAILED;
			});
	},
	selectors: {
		products: (state: IProductsState) => state.products,
	},
});

export const productsActions = { ...productsSlice.actions, getProducts, createProductReview, changeLikeProduct };
export const productsSelectors = productsSlice.selectors;
