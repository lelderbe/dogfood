import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
// import { authApi } from './api/authApi';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { api } from './api/api';
// import { productsApi } from './api/api';

// За докой по redux-persist идем на https://github.com/rt2zz/redux-persist
const persistConfig = {
	key: 'root',
	storage,
	version: 3,
	// сетевые данные в localStorage не сохраняем
	// blacklist: [authApi.reducerPath, productsApi.reducerPath],
	blacklist: [api.reducerPath],
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
