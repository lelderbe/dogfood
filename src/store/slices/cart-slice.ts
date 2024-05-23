import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartItem {
	id: IProduct['id'];
	count: number;
	price: IProduct['price'];
	discount: IProduct['discount'];
}

const createInitialState = (): CartItem[] => [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitialState(),
	reducers: {
		addProduct(state, action: PayloadAction<CartItem>) {
			const product = state.find((item) => item.id === action.payload.id);
			if (product) {
				product.count++;
			} else {
				state.push(action.payload);
			}
		},
		removeProduct(state, action: PayloadAction<string>) {
			return state.filter((item) => item.id !== action.payload);
		},
		increaseProductCount(state, action: PayloadAction<string>) {
			const product = state.find((item) => item.id === action.payload);
			if (product) {
				product.count = product.count + 1;
			}
		},
		decreaseProductCount(state, action: PayloadAction<string>) {
			const product = state.find((item) => item.id === action.payload);
			if (product) {
				product.count = product.count === 1 ? 1 : product.count - 1;
			}
		},
		// setProduct(state, action: PayloadAction<CartItem>) {
		// 	return [...state.filter((item) => item.id !== action.payload.id), action.payload];
		// },
		// getCount(state) {
		// 	return state.reduce((acc, item) => acc + item.count, 0);
		// },
		clearCart() {
			return createInitialState();
		},
	},
	selectors: {
		cart: (state) => state,
	},
});

export const cartActions = cartSlice.actions;
export const cartSelectors = cartSlice.selectors;
