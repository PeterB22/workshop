import { createSelector } from '@ngrx/store';
import type { CartState } from './cart.reducer';

export const selectCartState = (state: any) => state.cart as CartState;

export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart.items
);

export const selectIsInCart = (productId: string) =>
  createSelector(selectCartItems, (items) =>
    items.some((p) => p.product.id === productId)
  );

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.length
);
