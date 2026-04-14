import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { selectCartItems } from '../cart/cart.selectors';
import { selectFilterState } from '../filter/filter.selectors';

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

export const selectFilteredProducts = createSelector(
  selectProductsWithCartFlag,
  selectFilterState,
  (products, filters) => {
    if (!products) return [];

    return products.filter(p => {
      const matchesSearch = !filters.searchTerm || p.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesPrice = p.price >= (filters.minPrice ?? 0) && p.price <= (filters.maxPrice ?? Infinity);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }
);

export const selectProductById = (id: string) =>
  createSelector(selectProductState,
    (state) => state.products.find((p) => p.id === id)
  );

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state) => state.selectedProductId
);