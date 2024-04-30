import { combineReducers } from 'redux';
import { userSlice } from './slices/user-slice';
import { productsSlice } from './slices/products-slice';
import { productSlice } from './slices/product-slice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[productSlice.name]: productSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
});
