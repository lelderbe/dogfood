import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import api from '../services/api';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
		}),
});

export default store;
