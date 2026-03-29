import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { removeFromCart } from '../../../core/store/cart/cart.actions';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    imports: [CurrencyPipe, MatIconModule]
})
export class CartItemComponent {
    private store = inject(Store);
    item = input.required<CartItem>();

    removeItem() {
        this.store.dispatch(removeFromCart({ productId: this.item().product.id }));
    }
}