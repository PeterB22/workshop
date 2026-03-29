import { Component, inject, input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { decreaseQuantity, increaseQuantity } from '../../../core/store/cart/cart.actions';
import { CartItem } from '../../../core/store/cart/cart.reducer';

@Component({
    selector: 'app-cart-item-quantity',
    templateUrl: './cart-item-quantity.component.html',
    styleUrls: ['./cart-item-quantity.component.scss'],
    imports: [MatIconModule]
})
export class CartItemQuantityComponent {

    private store = inject(Store);
    item = input.required<CartItem>();

    increase() {
        this.store.dispatch(increaseQuantity({ productId: this.item().product.id }));
    }

    decrease() {
        this.store.dispatch(decreaseQuantity({ productId: this.item().product.id }));
    }

}