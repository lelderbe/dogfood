import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const createInitialState = (): Token => ({
	accessToken: '',
});

export const authSlice = createSlice({
	name: 'auth',
	initialState: createInitialState(),
	reducers: {
		setAccessToken(state, action: PayloadAction<Token>) {
			state.accessToken = action.payload.accessToken;
		},
		clearToken() {
			return createInitialState();
		},
	},
	selectors: {
		accessTokenSelector: (state: Token) => state.accessToken,
	},
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
