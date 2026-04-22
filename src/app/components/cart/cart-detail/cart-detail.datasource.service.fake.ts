import { computed, Injectable, Provider, signal } from '@angular/core';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { CartDatasource, CartDatasourceDef } from './cart-detail.datasource.service';

@Injectable()
export class CartDatasourceFake implements CartDatasourceDef {

    checkout(): void {
        throw new Error('Method not implemented.');
    }
    removeItem(id: string): void {
        throw new Error('Method not implemented.');
    }
    increaseQuantity(id: string): void {
        throw new Error('Method not implemented.');
    }
    decreaseQuantity(id: string): void {
        throw new Error('Method not implemented.');
    }
    private _cartItems = signal<CartItem[]>([]);

    cartItems = this._cartItems.asReadonly();

    total = computed(() =>
        this._cartItems().reduce(
            (sum, item) =>
                sum + item.product.price * item.quantity,
            0
        )
    );

    isCheckoutDisabled = computed(() =>
        this._cartItems().length === 0 ||
        this.total() === 0
    );

    setCartItems(items: CartItem[]) {
        this._cartItems.set(items);
    }

}

export function provideCartDatasourceFake(): Provider[] {
    return [
        CartDatasourceFake,
        {
            provide: CartDatasource,
            useClass: CartDatasourceFake,
        },
    ];
};
