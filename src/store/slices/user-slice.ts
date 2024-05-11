import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, updateCurrentUser } from '../thunks/user';

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
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getCurrentUser.fulfilled, (state, action) => {
	// 			state.currentUser = action.payload;
	// 			state.status = RequestStatus.SUCCESS;
	// 		})
	// 		.addCase(updateCurrentUser.fulfilled, (state, action) => {
	// 			state.currentUser = action.payload;
	// 			state.status = RequestStatus.SUCCESS;
	// 		})
	// 		.addMatcher(isActionPending(userSlice.name), (state) => {
	// 			state.status = RequestStatus.LOADING;
	// 		})
	// 		.addMatcher(isActionRejected(userSlice.name), (state) => {
	// 			state.status = RequestStatus.FAILED;
	// 		});
	// },
	selectors: {
		currentUser: (state: IUser) => state,
	},
});

export const userActions = { ...userSlice.actions, getCurrentUser, updateCurrentUser };
export const userSelectors = userSlice.selectors;
