import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { describe, it, expect, vi } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../providers/localstorage.service';
import { checkoutCart, clearCart } from './cart.actions';
import { CartEffects } from './cart.effects';
import { selectCartItems } from './cart.selectors';

describe(CartEffects.name, () => {
    it('should persist filtered cart and dispatch clearCart', async () => {
        const mockItems = [
            { product: { id: '1' }, quantity: 2 },
            { product: { id: '2' }, quantity: 0 },
        ];

        const localStorageService = {
            setItem: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                CartEffects,
                provideMockStore({
                    selectors: [
                        {
                            selector: selectCartItems,
                            value: mockItems,
                        },
                    ],
                }),
                { provide: Actions, useValue: of(checkoutCart()) },
                { provide: LocalStorageService, useValue: localStorageService },
            ],
        });

        const effects = TestBed.inject(CartEffects);

        const result = await firstValueFrom(effects.checkout$);

        expect(result).toEqual(clearCart());

        expect(localStorageService.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([
                { product: { id: '1' }, quantity: 2 },
            ])
        );
    });
});