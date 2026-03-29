import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess, selectProduct, upsertProduct } from './product.actions';
import { Product } from '../../models/product.model';

export interface ProductState {
    products: Product[];
    selectedProductId: string | null;
    loading: boolean;
    error: any;
}

export const initialState: ProductState = {
    products: [],
    selectedProductId: null,
    loading: false,
    error: null
};

export const productReducer = createReducer(
    initialState,
    on(loadProducts, (state) => ({ ...state, loading: true })),
    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        loading: false
    })),
    on(loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(selectProduct, (state, { productId }) => ({
        ...state,
        selectedProductId: productId
    })),
    on(upsertProduct, (state, { product }) => {
        const existingProductIndex = state.products.findIndex(p => p.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedProducts = [...state.products];
            updatedProducts[existingProductIndex] = product;
            return { ...state, products: updatedProducts };
        } else {
            return { ...state, products: [...state.products, product] };
        }
    })
);
