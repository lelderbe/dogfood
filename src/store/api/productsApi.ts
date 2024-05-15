import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { ReviewFormValues } from '../../components/forms/review/helpers/types';

export type CreateReviewRequest = {
	id: string;
	values: ReviewFormValues;
};

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
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
			providesTags: (response) => [{ type: 'Products', id: response?.id }],
		}),
		createProductReview: builder.mutation<IReview, CreateReviewRequest>({
			query: (request) => ({
				url: `/reviews/leave/${request.id}`,
				method: 'POST',
				body: request.values,
			}),
			invalidatesTags: (response) => [{ type: 'Products', id: response?.product?.id }],
		}),
	}),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductReviewMutation } = productsApi;
