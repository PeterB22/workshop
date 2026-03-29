import { Component, computed, effect, HostBinding, inject, Signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCartItems } from '../../../core/store/cart/cart.selectors';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { CartItemQuantityComponent } from '../cart-item-quantity/cart-item-quantity.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { checkoutCart } from '../../../core/store/cart/cart.actions';

@Component({
    selector: 'app-cart-detail',
    templateUrl: './cart-detail.component.html',
    styleUrls: ['./cart-detail.component.scss'],
    imports: [CartItemComponent, CartItemQuantityComponent, CurrencyPipe, MatButtonModule]
})
export class CartDetailComponent {

    private store = inject(Store);
    private overlayRef = inject(OverlayRef);
    cartItems: Signal<CartItem[] | undefined> = toSignal(this.store.pipe(select(selectCartItems)));
    total: Signal<number> = computed(() => {
        const items = this.cartItems();
        return items ? items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) : 0;
    });
    isCheckoutDisabled: Signal<boolean> = computed(() => {
        const noItem = !this.cartItems() || this.cartItems()!.length === 0
        const noPrice = this.total() === 0;
        return noItem || noPrice;
    });
    autoCloseOverlay = effect(() => {
        if (this.cartItems() && this.cartItems()!.length === 0) {
            this.overlayRef.dispose();
        }
    });

    checkout() {
        this.store.dispatch(checkoutCart());
        this.overlayRef.dispose();
    }
}