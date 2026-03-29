
import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from './cart.actions';
import type { Product } from '../../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => ({
    ...state,
    items: [...state.items, { product, quantity: 1 }]
  })),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(p => p.product.id !== productId)
  })),
  on(increaseQuantity, (state, { productId }) => ({
    ...state,
    items: state.items.map(item =>  item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
  })),
  on(decreaseQuantity, (state, { productId }) => ({
    ...state,
    items: state.items.map(item =>  item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)
  })),
  on(clearCart, state => ({
    ...state,
    items: []
  }))
);