import { increaseQuantity, decreaseQuantity } from './../../../core/store/cart/cart.actions';
import { computed, inject, Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { select, Store } from "@ngrx/store";
import { CartItem } from "../../../core/store/cart/cart.reducer";
import { selectCartItems } from "../../../core/store/cart/cart.selectors";
import { checkoutCart, removeFromCart } from "../../../core/store/cart/cart.actions";

@Injectable()
export class CartDatasource {
    private store = inject(Store);
    cartItems: Signal<CartItem[] | undefined>;
    total: Signal<number>;
    isCheckoutDisabled: Signal<boolean>;

    constructor() {
        this.cartItems = toSignal(this.store.pipe(select(selectCartItems)));

        this.total = computed(() => {
            const items = this.cartItems();
            return items ? items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) : 0;
        });

        this.isCheckoutDisabled = computed(() => {
            const noItem = !this.cartItems() || this.cartItems()!.length === 0;
            const noPrice = this.total() === 0;
            return noItem || noPrice;
        });
    }

    checkout() {
        this.store.dispatch(checkoutCart());
    }

    removeItem(productId: string) {
        this.store.dispatch(removeFromCart({ productId }));
    }

    increaseQuantity(productId: string) {
        this.store.dispatch(increaseQuantity({ productId }));
    }

    decreaseQuantity(productId: string) {
        this.store.dispatch(decreaseQuantity({ productId }));
    }
}