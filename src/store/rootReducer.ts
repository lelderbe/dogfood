import { combineReducers } from 'redux';
import { authSlice } from './slices/auth-slice';
import { filtersSlice } from './slices/filters-slice';
import { api } from './api/api';

export const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[api.reducerPath]: api.reducer,
	[filtersSlice.name]: filtersSlice.reducer,
});
