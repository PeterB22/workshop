import { Component, EventEmitter, input, Output, output, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { MatIconModule } from '@angular/material/icon';
import { ProductImageComponent } from '../../../shared/product-image/product-image.component';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    imports: [CurrencyPipe, MatIconModule, ProductImageComponent]
})
export class CartItemComponent {
    item = input.required<CartItem>();
    @Output() remove = new EventEmitter<string>();

    removeItem() {
        this.remove.emit(this.item().product.id);
    }
}