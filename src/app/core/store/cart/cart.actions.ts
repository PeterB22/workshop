import { createAction, props } from '@ngrx/store';
import type { Product } from '../../models/product.model';

export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: string }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ productId: string }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ productId: string }>()
);

export const checkoutCart = createAction('[Cart] Checkout');
export const clearCart = createAction('[Cart] Clear Cart');