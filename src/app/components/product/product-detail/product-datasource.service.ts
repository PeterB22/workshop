
import { computed, effect, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { addToCart } from '../../../core/store/cart/cart.actions';
import { selectIsInCart } from '../../../core/store/cart/cart.selectors';
import { selectProduct } from '../../../core/store/product/product.actions';
import { selectProductById } from '../../../core/store/product/product.selectors';

@Injectable()
export class ProductDatasource {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    productId: Signal<string | null>;
    product: Signal<Product | undefined>;
    isInCart: Signal<boolean | undefined>;

    constructor() {
        this.productId = toSignal(
            this.route.paramMap.pipe(
                map(params => params.get('id'))
            ),
            { initialValue: null }
        );

        this.product = computed(() => {
            const id = this.productId();
            if (!id) return undefined;
            return this.store.selectSignal(selectProductById(id))();
        });

        this.isInCart = computed(() => {
            const id = this.productId();
            if (!id) return undefined;
            return this.store.selectSignal(selectIsInCart(id))();
        });

        effect(() => {
            const id = this.productId();
            if (!id) return;
            this.store.dispatch(selectProduct({ productId: id }));
        });
    }

    addToCart(product: Product) {
        this.store.dispatch(addToCart({ product }));
    }
}