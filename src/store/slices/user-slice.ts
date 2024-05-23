import { createSlice } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../utils/store';
import { RequestStatus } from '../types';
import { getCurrentUser, updateCurrentUser } from '../thunks/user';

interface IUserState {
	currentUser: IUser | null;
	status: RequestStatus;
}

const initialState: IUserState = {
	currentUser: null,
	status: RequestStatus.IDLE,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.status = RequestStatus.SUCCESS;
			})
			.addCase(updateCurrentUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.status = RequestStatus.SUCCESS;
			})
			.addMatcher(isActionPending(userSlice.name), (state) => {
				state.status = RequestStatus.LOADING;
			})
			.addMatcher(isActionRejected(userSlice.name), (state) => {
				state.status = RequestStatus.FAILED;
			});
	},
	selectors: {
		currentUser: (state: IUserState) => state.currentUser,
		userRequestStatus: (state: IUserState) => state.status,
	},
});

export const userActions = { ...userSlice.actions, getCurrentUser, updateCurrentUser };
export const userSelectors = userSlice.selectors;
