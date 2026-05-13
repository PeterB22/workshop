import { firstValueFrom, of, throwError } from 'rxjs';
import { ProductsEffects } from './product.effects';
import { describe, it, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { ProductSearchService } from '../../providers/product-search.service';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './product.actions';
import { Product } from '../../models/product.model';

describe(ProductsEffects.name, () => {
    it('should dispatch loadProductsSuccess', async () => {
        const productsMock: Product[] = [{ id: '1', name: 'Laptop', price: 1000, description: 'A powerful laptop', imageUrl: 'laptop.jpg', category: 'electronics', rating: { rate: 4.5, count: 100 } }];

        const actions$ = of(loadProducts());

        const productSearchService = {
            getProducts: vi.fn(() => of(productsMock)),
        };

        TestBed.configureTestingModule({
            providers: [
                ProductsEffects,
                { provide: Actions, useValue: actions$ },
                { provide: ProductSearchService, useValue: productSearchService },
            ],
        });

        const effects = TestBed.inject(ProductsEffects);

        const result = await firstValueFrom(effects.loadProducts$);

        expect(result).toEqual(
            loadProductsSuccess({ products: productsMock })
        );
    });

    it('should dispatch loadProductsFailure on error', async () => {
        const error = new Error('API failed');

        const actions$ = of(loadProducts());

        const productSearchService = {
            getProducts: vi.fn(() => {
                return throwError(() => error);
            }),
        };

        TestBed.configureTestingModule({
            providers: [
                ProductsEffects,
                { provide: Actions, useValue: actions$ },
                { provide: ProductSearchService, useValue: productSearchService },
            ],
        });

        const effects = TestBed.inject(ProductsEffects);

        const result = await firstValueFrom(effects.loadProducts$);

        expect(result).toEqual(loadProductsFailure({ error }));
    });
});
