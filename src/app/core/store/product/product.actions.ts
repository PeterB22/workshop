import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction(
  '[Products] Load Products'
);
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const selectProduct = createAction(
  '[Products] Select a product',
  props<{ productId: string }>()
);

export const upsertProduct = createAction(
  '[Product] Upsert Product',
  props<{ product: Product }>()
);
