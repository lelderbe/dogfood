// import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { ReviewFormValues } from '../../components/forms/review/helpers/types';
import { ProfileFormValues } from '../../components/forms/profile/helpers/types';
import { SearchFilter } from '../slices/filters-slice';
// import { sleep } from '../../utils/utils';

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

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products', 'Product', 'User'],
	endpoints: (builder) => ({
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
			query: () => ({
				url: '/users/me',
			}),
			providesTags: ['User'],
		}),
		// getUser: builder.query<IUser, void>({
		// 	queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
		// 		await sleep(1000);
		// 		const response = await fetchWithBQ({
		// 			url: '/users/me',
		// 		});
		// 		console.log({ response });
		// 		return response.data
		// 			? { data: response.data as IUser }
		// 			: { error: response.error as FetchBaseQueryError };
		// 	},
		// 	providesTags: ['User'],
		// }),
		updateUser: builder.mutation<IUser, ProfileFormRequest>({
			query: (profileFormData) => ({
				url: '/users/me',
				method: 'PATCH',
				body: profileFormData,
			}),
			invalidatesTags: ['Product', 'User'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductReviewMutation,
	useSetProductLikeMutation,
	useGetUserQuery,
	useUpdateUserMutation,
} = productsApi;
