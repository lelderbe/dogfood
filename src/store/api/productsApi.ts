import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

type GetProductsResponse = IProducts;

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		getProducts: builder.query<GetProductsResponse, object>({
			query: () => ({
				url: '/products',
				params: {
					searchTerm: '',
					perPage: 8,
					page: 1,
				},
			}),
		}),
	}),
});

export const { useGetProductsQuery } = productsApi;
