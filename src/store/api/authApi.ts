import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { SignUpFormValues } from '../../components/forms/signUp/helpers/types';
import { SignInFormValues } from '../../components/forms/signIn/helpers/types';

type SignUpResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
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
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (signInFormValues) => ({
				url: '/auth/login',
				method: 'POST',
				body: signInFormValues,
			}),
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
