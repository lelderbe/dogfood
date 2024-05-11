import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import api from '../services/api';
import { authApi } from './api/authApi';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
		}).concat([authApi.middleware]),
});

export default store;
