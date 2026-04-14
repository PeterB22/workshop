
import { createAction, props } from '@ngrx/store';

export const setCategoryFilter = createAction(
  '[Filter] Set Category',
  props<{ category: string | null }>()
);

export const setPriceRangeFilter = createAction(
  '[Filter] Set Price Range',
  props<{ minPrice: number | null; maxPrice: number | null }>()
);

export const setSearchFilter = createAction(
  '[Filter] Set Search Term',
  props<{ searchTerm: string | null }>()
);

export const resetFilters = createAction('[Filter] Reset All Filters');