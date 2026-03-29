import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { selectCartItems } from '../cart/cart.selectors';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectProductsWithCartFlag = createSelector(
  selectAllProducts,
  selectCartItems,
  (products, cartItems) =>
    products.map(p => ({
      ...p,
      isInCart: cartItems.some(ci => ci.product.id === p.id)
    }))
);

export const selectProductById = (id: string) =>
  createSelector(selectProductState,
    (state) => state.products.find((p) => p.id === id)
  );

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state) => state.selectedProductId
);