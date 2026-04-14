import { createReducer, on } from '@ngrx/store';
import { resetFilters, setCategoryFilter, setPriceRangeFilter, setSearchFilter } from './filter.actions';

export interface FilterState {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    searchTerm: string | null;
}

export const initialFilterState: FilterState = {
    category: null,
    minPrice: null,
    maxPrice: null,
    searchTerm: ''
};

export const filterReducer = createReducer(
    initialFilterState,
    on(setCategoryFilter, (state, { category }) => ({ ...state, category })),
    on(setPriceRangeFilter, (state, range) => ({ ...state, ...range })),
    on(setSearchFilter, (state, { searchTerm }) => ({ ...state, searchTerm })),
    on(resetFilters, () => ({ ...initialFilterState }))
);
