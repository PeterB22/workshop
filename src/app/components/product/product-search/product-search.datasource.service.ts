import { inject, Injectable, Signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductWithExtensions } from '../../../core/models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectFilteredProducts } from '../../../core/store/product/product.selectors';
import { loadProducts } from '../../../core/store/product/product.actions';

@Injectable()
export class ProductSearchDatasource {
    private store = inject(Store);

    products: Signal<ProductWithExtensions[] | undefined>;

    constructor() {
        this.products = toSignal(this.store.pipe(select(selectFilteredProducts)));
    }

    loadProducts() {
        this.store.dispatch(loadProducts());
    }
}