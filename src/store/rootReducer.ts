import { combineReducers } from 'redux';
import { userSlice } from './slices/user-slice';
import { authSlice } from './slices/auth-slice';
import { authApi } from './api/authApi';
import { productsApi } from './api/productsApi';
import { filtersSlice } from './slices/filters-slice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[authSlice.name]: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[filtersSlice.name]: filtersSlice.reducer,
});
