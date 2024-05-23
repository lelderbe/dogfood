import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchFilter {
	searchTerm: string;
}

const createInitialState = (): SearchFilter => ({
	searchTerm: '',
});

export const filtersSlice = createSlice({
	name: 'filters',
	initialState: createInitialState(),
	reducers: {
		setFilter(state, action: PayloadAction<Partial<SearchFilter>>) {
			return {
				...state,
				...action.payload,
			};
		},
		clearFilter() {
			return createInitialState();
		},
	},
	selectors: {
		filters: (state) => state,
	},
});

export const filtersActions = filtersSlice.actions;
export const filtersSelectors = filtersSlice.selectors;
