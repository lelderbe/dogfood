import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { api } from './api/api';
import { filtersSlice } from './slices/filters-slice';
import { cartSlice } from './slices/cart-slice';

// За докой по redux-persist идем на https://github.com/rt2zz/redux-persist
const persistConfig = {
	key: 'root',
	storage,
	version: 5,
	// сетевые данные в localStorage не сохраняем
	blacklist: [api.reducerPath, filtersSlice.name, cartSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([api.middleware]),
});

export const persistor = persistStore(store);

export default store;
