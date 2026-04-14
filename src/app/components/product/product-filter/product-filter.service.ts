import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { setSearchFilter, setCategoryFilter, setPriceRangeFilter } from '../../../core/store/filter/filter.actions';
import { initialFilterState } from '../../../core/store/filter/filter.reducer';
import { selectFilterState } from '../../../core/store/filter/filter.selectors';

@Injectable()
export class ProductFilterService {
    private store = inject(Store);
    private filterState = toSignal(this.store.select(selectFilterState), { initialValue: initialFilterState });

    keywords = signal<string | null>('');
    priceRange = signal<{ minPrice: number | null; maxPrice: number | null }>({ minPrice: 0, maxPrice: 200 });
    category = signal<string | null>(null);

    constructor() {
        effect(() => {
            const state = this.filterState();
            this.keywords.set(state.searchTerm);
            this.priceRange.set({ minPrice: state.minPrice, maxPrice: state.maxPrice });
            this.category.set(state.category);
        });
    }

    updateKeywords(value: string | null) {
        this.keywords.set(value);
        this.store.dispatch(setSearchFilter({ searchTerm: value }));
    }

    updateCategory(category: string | null) {
        this.category.set(category);
        this.store.dispatch(setCategoryFilter({ category }));
    }

    updatePrice(range: { minPrice: number | null, maxPrice: number | null }) {
        this.priceRange.set(range);
        this.store.dispatch(setPriceRangeFilter(range));
    }
}