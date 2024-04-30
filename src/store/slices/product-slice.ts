import { createSlice } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../utils/store';
import { RequestStatus } from '../types';
import { getProduct } from '../thunks/product';

interface IProductState {
	product: IProduct | null;
	status: RequestStatus;
}

const initialState: IProductState = {
	product: null,
	status: RequestStatus.IDLE,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProduct.fulfilled, (state, action) => {
				state.product = action.payload;
				state.status = RequestStatus.SUCCESS;
			})
			.addMatcher(isActionPending(productSlice.name), (state) => {
				state.status = RequestStatus.LOADING;
			})
			.addMatcher(isActionRejected(productSlice.name), (state) => {
				state.status = RequestStatus.FAILED;
			});
	},
	selectors: {
		product: (state: IProductState) => state.product,
		status: (state: IProductState) => state.status,
	},
});

export const productActions = { ...productSlice.actions, getProduct };
export const productSelectors = productSlice.selectors;
