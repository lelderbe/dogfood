import { createAsyncThunk } from '@reduxjs/toolkit';
import store from './store';
import { Api } from '../services/api';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	extra: Api;
}>();

export enum RequestStatus {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED',
}
