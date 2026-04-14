import { Component, effect, inject, signal } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductFilterService } from './product-filter.service';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { Store } from '@ngrx/store';
import { selectFilterState } from '../../../core/store/filter/filter.selectors';
import { setCategoryFilter, setPriceRangeFilter, setSearchFilter } from '../../../core/store/filter/filter.actions';
import { initialFilterState } from '../../../core/store/filter/filter.reducer';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss'],
    imports: [PriceRangeComponent, SearchComponent, CategoryComponent],
    providers: [ProductFilterService]
})
export class ProductFilterComponent {

    private productFilterService = inject(ProductFilterService);
    keywords = this.productFilterService.keywords;
    priceRange = this.productFilterService.priceRange;
    category = this.productFilterService.category;

    updateKeywords(value: string | null) {
        this.productFilterService.updateKeywords(value);
    }

    updateCategory(category: string | null) {
        this.productFilterService.updateCategory(category);
    }

    updatePrice(range: { minPrice: number | null; maxPrice: number | null }) {
        this.productFilterService.updatePrice(range);
    }
}

