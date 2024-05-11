import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { SignUpFormValues } from '../../components/forms/signUp/helpers/types';

type SignUpResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
			query: (signUpFormValues) => ({
				url: '/auth/register',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
	}),
});

export const { useSignUpMutation } = authApi;
