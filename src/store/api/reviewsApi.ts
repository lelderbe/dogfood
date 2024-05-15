import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { ReviewFormValues } from '../../components/forms/review/helpers/types';

export type CreateReviewRequest = {
	id: string;
	values: ReviewFormValues;
};

export const reviewsApi = createApi({
	reducerPath: 'reviewsApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		createReview: builder.mutation<IReview, CreateReviewRequest>({
			query: (request) => ({
				url: `/reviews/leave/${request.id}`,
				method: 'POST',
				body: request.values,
			}),
		}),
	}),
});

export const { useCreateReviewMutation } = reviewsApi;
