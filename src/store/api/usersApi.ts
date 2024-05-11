import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		getUser: builder.query<IUser, string>({
			query: () => ({
				url: '/users/me',
			}),
		}),
	}),
});

export const { useGetUserQuery } = usersApi;
