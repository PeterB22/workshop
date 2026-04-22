import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { CartDetailComponent } from './cart-detail.component';
import { CartDatasourceFake, provideCartDatasourceFake } from "./cart-detail.datasource.service.fake";
import { OverlayRef } from '@angular/cdk/overlay';
import { CartDatasource } from './cart-detail.datasource.service';
import { Product } from '../../../core/models/product.model';
import { signal } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe(CartDetailComponent.name, () => {

    it('should disable checkout when cart empty', () => {
        const { fixture, datasource } = setupComponentWithFake();
        datasource.setCartItems([]);
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.disabled).toBe(true);
    });

    it('should enable checkout when cart has items', () => {
        const { fixture, datasource } = setupComponentWithFake();
        datasource.setCartItems([{ product: { id: '1', name: 'Laptop', price: 100 } as Product, quantity: 5 }]);
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.disabled).toBe(false);
    });

    it('should call checkout on click', () => {
        const { fixture, datasource } = setupComponentInteraction();
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').click();
        expect(datasource.checkout).toHaveBeenCalled();
    });

    it('should increase quantity', () => {
        const { component, datasource } = setupComponentInteraction();
        component.quantityChange({ productId: '1', change: 'increase' });
        expect(datasource.increaseQuantity).toHaveBeenCalled();
    });

    it('should decrease quantity', () => {
        const { component, datasource } = setupComponentInteraction();
        component.quantityChange({ productId: '1', change: 'decrease' });
        expect(datasource.decreaseQuantity).toHaveBeenCalled();
    });


    function setupComponentWithFake() {
        TestBed.configureTestingModule({
            imports: [CartDetailComponent],
        }).overrideComponent(CartDetailComponent, {
            set: {
                providers: [
                    provideCartDatasourceFake(),
                    MockProvider(OverlayRef)
                ]
            }
        });
        const fixture = TestBed.createComponent(CartDetailComponent);
        const datasource = fixture.debugElement.injector.get(CartDatasource) as unknown as CartDatasourceFake;

        return {
            fixture,
            datasource
        };
    }

    function setupComponentInteraction() {
        const datasourceMock: Partial<CartDatasource> = {
            checkout: vi.fn(),
            removeItem: vi.fn(),
            increaseQuantity: vi.fn(),
            decreaseQuantity: vi.fn(),
            cartItems: signal([]),
            total: signal(0),
            isCheckoutDisabled: signal(false)
        };
        TestBed.configureTestingModule({
            imports: [CartDetailComponent],
            providers: [
                MockProvider(OverlayRef),
                provideMockStore({
                    initialState: {
                        cart: {
                            items: [{
                                product: { id: '1', name: 'Laptop', price: 1000 },
                                quantity: 1
                            }]
                        }
                    }
                })
            ]
        }).overrideComponent(CartDetailComponent, {
            set: {
                providers: [
                    { provide: CartDatasource, useValue: datasourceMock }
                ]
            }
        }).compileComponents();

        const fixture = TestBed.createComponent(CartDetailComponent);
        const component = fixture.componentInstance;
        const datasource = fixture.debugElement.injector.get(CartDatasource) as unknown as CartDatasourceFake;

        return {
            fixture,
            component,
            datasource
        };
    }
});

