import { Component, effect, inject, Signal } from '@angular/core';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { CartItemQuantityComponent } from '../cart-item-quantity/cart-item-quantity.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { CartDatasource } from './cart-detail.datasource.service';

@Component({
    selector: 'app-cart-detail',
    templateUrl: './cart-detail.component.html',
    styleUrls: ['./cart-detail.component.scss'],
    imports: [CartItemComponent, CartItemQuantityComponent, CurrencyPipe, MatButtonModule],
    providers: [CartDatasource]
})
export class CartDetailComponent {

    private cartDs = inject(CartDatasource);
    private overlayRef = inject(OverlayRef);
    cartItems: Signal<CartItem[] | undefined> = this.cartDs.cartItems;
    total: Signal<number> = this.cartDs.total;
    isCheckoutDisabled: Signal<boolean> = this.cartDs.isCheckoutDisabled;
    autoCloseOverlay = effect(() => {
        if (this.cartItems() && this.cartItems()!.length === 0) {
            this.overlayRef.dispose();
        }
    });

    removeItem(productId: string) {
        this.cartDs.removeItem(productId);
    }

    quantityChange(event: { productId: string, change: 'increase' | 'decrease' }) {
        if (event.change === 'increase') {
            this.cartDs.increaseQuantity(event.productId);
        } else {
            this.cartDs.decreaseQuantity(event.productId);
        }
    }

    checkout() {
        this.cartDs.checkout();
        this.overlayRef.dispose();
    }
}