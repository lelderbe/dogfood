import { UserUpdateDto } from '../../services/api';
import { createAppAsyncThunk } from '../types';

export const getCurrentUser = createAppAsyncThunk<IUser, void>('user/getCurrentUser', async (_, { extra: api }) => {
	return await api.getUserInfo();
});

export const updateCurrentUser = createAppAsyncThunk<IUser, UserUpdateDto>(
	'user/updateCurrentUser',
	async (dataUser, { extra: api }) => {
		return await api.setUserInfo(dataUser);
	}
);
