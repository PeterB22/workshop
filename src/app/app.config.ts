import { ApplicationConfig, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductsEffects } from './core/store/product/product.effects';
import { routes } from './app.routes';
import { productReducer } from './core/store/product/product.reducer';
import { ProductSearchService } from './core/providers/product-search.service';
import { cartReducer } from './core/store/cart/cart.reducer';
import { LocalStorageService } from './core/providers/localstorage.service';
import { CartEffects } from './core/store/cart/cart.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        ProductSearchService,
        LocalStorageService,
        provideHttpClient(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideStore({
            product: productReducer,
            cart: cartReducer
        }),
        provideEffects([ProductsEffects, CartEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};
