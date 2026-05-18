import { Signal, InjectionToken } from "@angular/core";
import { CartItem } from "../../../core/store/cart/cart.reducer";

export interface CartDatasourceDef {
  cartItems: Signal<CartItem[] | undefined>;
  total: Signal<number | undefined>;
  isCheckoutDisabled: Signal<boolean | undefined>;
  checkout(): void;
  removeItem(id: string): void;
  increaseQuantity(id: string): void;
  decreaseQuantity(id: string): void;
}

export const CART_DATASOURCE = new InjectionToken<CartDatasourceDef>("CART_DATASOURCE");