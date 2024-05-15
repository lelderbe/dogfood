import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const createInitialState = (): IUser => ({
	id: '',
	email: '',
	name: '',
	avatarPath: '',
	about: '',
	phone: '',
	roles: [],
	likes: [],
});

export const userSlice = createSlice({
	name: 'user',
	initialState: createInitialState(),
	reducers: {
		setUser: (state, action: PayloadAction<Partial<IUser>>) => {
			return {
				...state,
				...action.payload,
			};
		},
		clearUser() {
			return createInitialState();
		},
	},
	selectors: {
		currentUser: (state: IUser) => state,
	},
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
