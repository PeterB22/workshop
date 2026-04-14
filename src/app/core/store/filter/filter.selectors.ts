import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.reducer';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectCategoryFilter = createSelector(
  selectFilterState,
  (state) => state.category
);

export const selectPriceFilter = createSelector(
  selectFilterState,
  (state) => ({ min: state.minPrice, max: state.maxPrice })
);

export const selectSearchFilter = createSelector(
  selectFilterState,
  (state) => state.searchTerm
);
