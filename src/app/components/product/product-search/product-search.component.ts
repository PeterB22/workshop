import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductWithExtensions } from '../../../core/models/product.model';
import { loadProducts } from '../../../core/store/product/product.actions';
import { selectProductsWithCartFlag } from '../../../core/store/product/product.selectors';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.scss'],
    imports: [ProductListComponent, ProductItemComponent, ProductFilterComponent]
})
export class ProductSearchComponent implements OnInit {
    private store = inject(Store);
    products: Signal<ProductWithExtensions[] | undefined> = toSignal(this.store.pipe(select(selectProductsWithCartFlag)));

    ngOnInit(): void {
        this.store.dispatch(loadProducts());
    }
}
