import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { SignUpFormValues } from '../../components/forms/signUp/helpers/types';
import { SignInFormValues } from '../../components/forms/signIn/helpers/types';
import { authActions } from '../slices/auth-slice';

type SignUpResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

// type SignIn2Response = {
// 	user: IUser;
// 	accessToken: Token['accessToken'];
// };

// type SignIn3Response = {
// 	user: IUser;
// 	accessToken: Token['accessToken'];
// };

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	tagTypes: ['User'],
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
		signIn2: builder.mutation<IUser, SignInFormValues>({
			// queryFn: async (arg, api, _extraOptions, fetchWithBQ) => {
			// 	const loginResponse = await fetchWithBQ({
			// 		url: '/auth/login',
			// 		method: 'POST',
			// 		body: arg,
			// 	});
			// 	console.log({ loginResponse });
			// 	if (loginResponse.error) {
			// 		return { error: loginResponse.error as FetchBaseQueryError };
			// 	}
			// 	const { accessToken } = loginResponse.data as SignInResponse;
			// 	api.dispatch(authActions.setAccessToken({ accessToken }));

			// 	return { data: loginResponse.data as SignInResponse };
			// 	// ? { data: loginResponse.data as SignInResponse }
			// 	// : { error: loginResponse.error as FetchBaseQueryError };

			queryFn: async (arg, api, _extraOptions, fetchWithBQ) => {
				const loginResponse = await fetchWithBQ({
					url: '/auth/login',
					method: 'POST',
					body: arg,
				});
				console.log({ loginResponse });
				if (loginResponse.error) {
					return { error: loginResponse.error as FetchBaseQueryError };
				}
				const { accessToken } = loginResponse.data as SignInResponse;
				console.log(accessToken);
				api.dispatch(authActions.setAccessToken({ accessToken }));
				const userResponse = await fetchWithBQ('/users/me');
				console.log({ userResponse });

				return userResponse.data
					? { data: userResponse.data as IUser }
					: { error: userResponse.error as FetchBaseQueryError };

				// 	queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
				// const loginResponse = await fetchWithBQ({
				// 	url: '/auth/login',
				// 	method: 'POST',
				// 	body: arg,
				// });
				// console.log({ loginResponse });
				// if (loginResponse.error) {
				// 	return { error: loginResponse.error as FetchBaseQueryError };
				// }
				// const { accessToken } = loginResponse.data as SignInResponse;
				// const userResponse = await fetchWithBQ({
				// 	url: '/users/me',
				// 	headers: {
				// 		authorization: accessToken || '',
				// 	},
				// });
				// console.log({ userResponse });

				// return userResponse.data
				// 	? { data: { accessToken, user: userResponse.data as IUser } }
				// 	: { error: userResponse.error as FetchBaseQueryError };

				// const baseUrl = process.env.API_URL;
				// try {
				// 	const response = await fetch(`${baseUrl}/auth/login`, {
				// 		method: 'POST',
				// 		body: JSON.stringify(signInFormValues),
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 	});
				// 	const responseBody = await response.json();
				// 	console.log({ responseBody });
				// 	const userResponse = await fetch(`${baseUrl}/users/me`, {
				// 		headers: {
				// 			authorization: responseBody.accessToken,
				// 		},
				// 	});
				// 	return {
				// 		data: {
				// 			accessToken: responseBody.accessToken,
				// 			user: await userResponse.json(),
				// 		},
				// 	};
				// } catch (e: any) {
				// 	return { error: e.message };
				// }
			},
			// invalidatesTags: ['User'],
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation, useSignIn2Mutation } = authApi;
