import { LocalStorageService } from './../../../core/providers/localstorage.service';
import { TestBed } from "@angular/core/testing";
import { CartDatasource } from "./cart-detail.datasource.service";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cartReducer } from '../../../core/store/cart/cart.reducer';
import { filterReducer } from '../../../core/store/filter/filter.reducer';
import { selectCartItems } from '../../../core/store/cart/cart.selectors';
import { Product } from '../../../core/models/product.model';

describe(CartDatasource.name, () => {

    it('should calculate total', () => {
        const { datasource, store } = setup();
        store.overrideSelector(selectCartItems, [{ product: { id: '1', name: 'Laptop', price: 10 } as Product, quantity: 2 }]);
        store.refreshState();
        expect(datasource.total()).toBe(20);
    });

    function setup() {
        TestBed.configureTestingModule({
            providers: [
                CartDatasource,
                LocalStorageService,
                provideMockStore({
                    initialState: {
                        cart: cartReducer(undefined, { type: '' }),
                        filter: filterReducer(undefined, { type: '' })
                    }
                })
            ]
        });

        const datasource = TestBed.inject(CartDatasource);
        const store = TestBed.inject(MockStore);

        return {
            datasource,
            store
        };
    }
}); 