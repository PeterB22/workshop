import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../providers/localstorage.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { checkoutCart, clearCart } from './cart.actions';
import { first, map, switchMap, tap } from 'rxjs';
import { selectCartItems } from './cart.selectors';

@Injectable()
export class CartEffects {
    private localStorageService = inject(LocalStorageService);
    private actions$ = inject(Actions);
    private store = inject(Store);

    checkout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(checkoutCart),
            switchMap(() => this.store.pipe(select(selectCartItems), first())),
            tap((items) => {
                const validItems = items ? items.filter(item => item.quantity > 0) : [];
                this.localStorageService.setItem('cart', JSON.stringify(validItems));
            }),
            map(() => clearCart())
    ));
}