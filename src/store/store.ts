import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from './api/authApi';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { productsApi } from './api/productsApi';

// За докой по redux-persist идем на https://github.com/rt2zz/redux-persist
const persistConfig = {
	key: 'root',
	storage,
	version: 2,
	// сетевые данные в localStorage не сохраняем
	blacklist: [authApi.reducerPath, productsApi.reducerPath],
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
		}).concat([authApi.middleware, productsApi.middleware]),
});

export const persistor = persistStore(store);

export default store;
