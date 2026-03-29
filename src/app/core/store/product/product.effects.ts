import { inject, Injectable } from '@angular/core';
import { ProductSearchService } from '../../providers/product-search.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { loadProducts, loadProductsFailure, loadProductsSuccess, selectProduct, upsertProduct } from './product.actions';

@Injectable()
export class ProductsEffects {
    private productSearchService = inject(ProductSearchService);
    private actions$ = inject(Actions);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            mergeMap(() =>
                this.productSearchService.getProducts().pipe(
                    map((products) => loadProductsSuccess({ products })),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );

    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(selectProduct),
            mergeMap(({ productId }) =>
                this.productSearchService.getProductById(productId).pipe(
                    map((product) => upsertProduct({ product })),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );

}
