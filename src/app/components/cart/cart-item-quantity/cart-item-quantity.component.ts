import { Component, EventEmitter, inject, input, Output, Signal } from '@angular/core';
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

    item = input.required<CartItem>();
    @Output() quantityChange = new EventEmitter<{ productId: string, change: 'increase' | 'decrease' }>();

    increase() {
        this.quantityChange.emit({ productId: this.item().product.id, change: 'increase' });
    }

    decrease() {
        this.quantityChange.emit({ productId: this.item().product.id, change: 'decrease' });
    }

}