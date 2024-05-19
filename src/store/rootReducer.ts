import { combineReducers } from 'redux';
import { userSlice } from './slices/user-slice';
import { authSlice } from './slices/auth-slice';
import { filtersSlice } from './slices/filters-slice';
import { api } from './api/api';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[authSlice.name]: authSlice.reducer,
	[api.reducerPath]: api.reducer,
	[filtersSlice.name]: filtersSlice.reducer,
});
