import { describe, it, expect, test, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductDatasource } from './product-datasource.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { cartReducer } from '../../../core/store/cart/cart.reducer';
import { productReducer } from '../../../core/store/product/product.reducer';

describe(ProductDatasource.name, () => {

    it('should expose productId from route', () => {
        const { datasource } = setupDatasource();
        expect(datasource.productId()).toBe('1');
    });

    test('should select product from store', async () => {
        const { datasource, store } = setupDatasource();
        const product = { id: '1', name: 'Laptop', price: 100 } as Product;
        store.setState({ product: { products: [product] } });
        store.refreshState();
        await expect.poll(() => datasource.product()).toEqual(product);
    });

    test('should dispatch selectProduct when id changes', async () => {
        const { store, paramMap$ } = setupDatasource();
        const spy = vi.spyOn(store, 'dispatch');
        paramMap$.next(convertToParamMap({ id: '2' }));
        await expect.poll(() => spy).toHaveBeenCalledWith(
            expect.objectContaining({
                productId: '2'
            })
        );
    });

    it('should dispatch addToCart', () => {
        const { datasource, store } = setupDatasource();
        const spy = vi.spyOn(store, 'dispatch');
        const product = { id: '1', name: 'Laptop', price: 100 } as Product;
        datasource.addToCart(product);
        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({ product })
        );
    });

    function setupDatasource() {
        const paramMap$ = new BehaviorSubject(convertToParamMap({ id: '1' }));

        TestBed.configureTestingModule({
            providers: [
                ProductDatasource,
                provideMockStore({
                    initialState: {
                        cart: cartReducer(undefined, { type: '' }),
                        product: productReducer(undefined, { type: '' })
                    }
                }),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: paramMap$.asObservable()
                    }
                }
            ]
        });

        const datasource = TestBed.inject(ProductDatasource);
        const store = TestBed.inject(MockStore);

        return { datasource, store, paramMap$ };
    }
});