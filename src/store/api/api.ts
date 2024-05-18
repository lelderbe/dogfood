import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { ReviewFormValues } from '../../components/forms/review/helpers/types';
import { ProfileFormValues } from '../../components/forms/profile/helpers/types';
import { SearchFilter } from '../slices/filters-slice';
import { SignInFormValues } from '../../components/forms/signIn/helpers/types';
import { SignUpFormValues } from '../../components/forms/signUp/helpers/types';
import { authActions } from '../slices/auth-slice';
import { sleep } from '../../utils/utils';

type SignUpResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
	user: Pick<IUser, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

export type CreateReviewRequest = {
	id: string;
	values: ReviewFormValues;
};

type ProfileFormRequest = Pick<ProfileFormValues, 'phone' | 'email'> & {
	name: string;
};

type SetProductLikeResponse = {
	message: string;
	like: {
		id: string;
		userId: string;
		productId: string;
	};
};

type SetProductLikeRequest = {
	id: string;
	liked: boolean;
};

const defaultUser = {
	id: '',
	email: '',
	name: '',
	avatarPath: '',
	about: '',
	phone: '',
	roles: [],
	likes: [],
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: customBaseQuery,
	tagTypes: ['Products', 'Product', 'User'],
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
			queryFn: async (arg, api, _extraOptions, fetchWithBQ) => {
				const loginResponse = await fetchWithBQ({
					url: '/auth/register',
					method: 'POST',
					body: arg,
				});
				if (loginResponse.error) {
					return { error: loginResponse.error as FetchBaseQueryError };
				}
				const { accessToken } = loginResponse.data as SignInResponse;
				api.dispatch(authActions.setAccessToken({ accessToken }));
				return { data: loginResponse.data as SignInResponse };
			},
			invalidatesTags: ['User'],
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			queryFn: async (arg, api, _extraOptions, fetchWithBQ) => {
				const loginResponse = await fetchWithBQ({
					url: '/auth/login',
					method: 'POST',
					body: arg,
				});
				if (loginResponse.error) {
					return { error: loginResponse.error as FetchBaseQueryError };
				}
				const { accessToken } = loginResponse.data as SignInResponse;
				api.dispatch(authActions.setAccessToken({ accessToken }));
				return { data: loginResponse.data as SignInResponse };
			},
			invalidatesTags: ['User'],
		}),
		getProducts: builder.query<IProducts, Partial<SearchFilter>>({
			query: ({ searchTerm, page }) => ({
				url: '/products',
				params: {
					searchTerm: searchTerm || '',
					perPage: 8,
					page: page || 1,
				},
			}),
			providesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		getProductById: builder.query<IProduct, IProduct['id']>({
			query: (id) => ({
				url: `/products/${id}`,
			}),
			providesTags: (response) => [{ type: 'Product', id: response?.id }],
		}),
		createProductReview: builder.mutation<IReview, CreateReviewRequest>({
			query: (request) => ({
				url: `/reviews/leave/${request.id}`,
				method: 'POST',
				body: request.values,
			}),
			invalidatesTags: (response) => [{ type: 'Product', id: response?.product?.id }],
		}),
		setProductLike: builder.mutation<SetProductLikeResponse, SetProductLikeRequest>({
			query: (request) => ({
				url: `/products/${request.id}/likes`,
				method: request.liked ? 'DELETE' : 'PUT',
			}),
			invalidatesTags: (response) => ['User', 'Products', { type: 'Product', id: response?.like?.productId }],
		}),
		getUser: builder.query<IUser, void>({
			queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
				await sleep(1000);
				const response = await fetchWithBQ({
					url: '/users/me',
				});
				return response.data ? { data: response.data as IUser } : { data: defaultUser as IUser };
			},
			providesTags: ['User'],
		}),
		updateUser: builder.mutation<IUser, ProfileFormRequest>({
			query: (profileFormData) => ({
				url: '/users/me',
				method: 'PATCH',
				body: profileFormData,
			}),
			invalidatesTags: ['Product', 'User'],
		}),
		refetchUser: builder.mutation<null, void>({
			// The query is not relevant here, so a `null` returning `queryFn` is used
			queryFn: () => ({ data: null }),
			// This mutation takes advantage of tag invalidation behaviour to trigger
			// any queries that provide the 'User' tags to re-fetch if the queries
			// are currently subscribed to the cached data
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductReviewMutation,
	useSetProductLikeMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useRefetchUserMutation,
} = api;
