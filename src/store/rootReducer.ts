import { combineReducers } from 'redux';
import { authSlice } from './slices/auth-slice';
import { filtersSlice } from './slices/filters-slice';
import { api } from './api/api';
import { cartSlice } from './slices/cart-slice';

export const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[api.reducerPath]: api.reducer,
	[filtersSlice.name]: filtersSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
});
