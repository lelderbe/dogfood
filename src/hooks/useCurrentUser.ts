import { useEffect } from 'react';
import { useGetUserQuery } from '../store/api/productsApi';
import { useAppDispatch } from '../store/hooks';
import { userActions } from '../store/slices/user-slice';

export const useCurrentUser = () => {
	const { data: user } = useGetUserQuery();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(userActions.setUser(user));
		}
	}, [user]);

	return user;
};
