import { combineReducers } from 'redux';
import { userSlice } from './slices/user-slice';
import { productsSlice } from './slices/products-slice';
import { productSlice } from './slices/product-slice';
import { authSlice } from './slices/auth-slice';
import { authApi } from './api/authApi';
import { usersApi } from './api/usersApi';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productSlice.name]: productSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
});
