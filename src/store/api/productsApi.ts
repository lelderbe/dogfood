import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { ReviewFormValues } from '../../components/forms/review/helpers/types';
import { ProfileFormValues } from '../../components/forms/profile/helpers/types';

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
		getProducts: builder.query<IProducts, object>({
			query: () => ({
				url: '/products',
				params: {
					searchTerm: '',
					perPage: 8,
					page: 1,
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
			invalidatesTags: (response) => ['Products', { type: 'Product', id: response?.like?.productId }],
		}),
		getUser: builder.query<IUser, void>({
			query: () => ({
				url: '/users/me',
			}),
			providesTags: ['User'],
		}),
		updateUser: builder.mutation<IUser, ProfileFormRequest>({
			query: (profileFormData) => ({
				url: '/users/me',
				method: 'PATCH',
				body: profileFormData,
			}),
			invalidatesTags: ['Product'],
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
