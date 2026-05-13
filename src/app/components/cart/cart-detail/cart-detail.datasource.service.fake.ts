import { Injectable, Provider, signal, WritableSignal } from '@angular/core';
import { CartItem } from '../../../core/store/cart/cart.reducer';
import { CartDatasource, CartDatasourceDef } from './cart-detail.datasource.service';

@Injectable()
export class CartDatasourceFake implements CartDatasourceDef {

  cartItems: WritableSignal<CartItem[] | undefined> = signal([]);
  total: WritableSignal<number> = signal(0);
  isCheckoutDisabled: WritableSignal<boolean | undefined> = signal(undefined);


  checkout(): void {
    throw new Error('Method not implemented.');
  }
  removeItem(id: string): void {
    this.cartItems()?.filter(cartItem => cartItem.product.id === id);
  }
  increaseQuantity(id: string): void {
    const matchingCartItem = this.cartItems()?.find(cartItem => cartItem.product.id === id);
    if (matchingCartItem) {
      matchingCartItem.quantity += 1;
    }
  }
  decreaseQuantity(id: string): void {
    const matchingCartItem = this.cartItems()?.find(cartItem => cartItem.product.id === id);
    if (matchingCartItem) {
      matchingCartItem.quantity += 1;
    }
  }

  setCartItems(items: CartItem[]) {
    this.cartItems.set(items);
  }

  setCheckoutDisabled(isDisabled: boolean) {
    this.isCheckoutDisabled.set(isDisabled);
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
