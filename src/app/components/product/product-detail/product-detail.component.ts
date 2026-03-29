import { addToCart } from '../../../core/store/cart/cart.actions';
import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgRatings } from 'ng-ratings';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectProduct } from '../../../core/store/product/product.actions';
import { Product } from '../../../core/models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectProductById } from '../../../core/store/product/product.selectors';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { selectIsInCart } from '../../../core/store/cart/cart.selectors';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-product-detail-component',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    imports: [CurrencyPipe, MatIconModule, NgRatings, MatButtonModule]
})
export class ProductDetailComponent {
    private route = inject(ActivatedRoute);
    private store = inject(Store);
    private snackBar = inject(MatSnackBar);
    productId: Signal<string | null> = toSignal(
        this.route.paramMap.pipe(
            map(params => params.get('id'))
        ),
        { initialValue: null }
    );
    product: Signal<Product | undefined> = computed(() => {
        const id = this.productId();
        if (!id) {
            return undefined;
        }
        return this.store.selectSignal(selectProductById(id))();
    });
    isInCart: Signal<boolean | undefined> = computed(() => {
        const id = this.productId();
        if (!id) {
            return undefined;
        }
        return this.store.selectSignal(selectIsInCart(id))();
    });

    constructor() {
        effect(() => {
            const id = this.productId();
            if (!id) {
                return;
            }
            this.store.dispatch(selectProduct({ productId: this.productId()! }));
        });
    }

    addToCart(product: Product): void {
        this.store.dispatch(addToCart({ product }));
        this.snackBar.open(`Item added to cart!`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

}

