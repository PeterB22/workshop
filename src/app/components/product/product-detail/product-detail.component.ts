import { Component, inject, Signal } from '@angular/core';
import { NgRatings } from 'ng-ratings';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductImageComponent } from '../../../shared/product-image/product-image.component';
import { PRODUCT_DATASOURCE } from './product-datasource-types';
import { ProductDatasource } from './product-datasource.service';

@Component({
    selector: 'app-product-detail-component',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    imports: [CurrencyPipe, MatIconModule, NgRatings, MatButtonModule, ProductImageComponent],
    providers: [{
      provide: PRODUCT_DATASOURCE,
      useClass: ProductDatasource
    }]
})
export class ProductDetailComponent {
    private productDs = inject(PRODUCT_DATASOURCE);
    private snackBar = inject(MatSnackBar);

    product: Signal<Product | undefined> = this.productDs.product
    isInCart: Signal<boolean | undefined> = this.productDs.isInCart;

    addToCart(product: Product): void {
        this.productDs.addToCart(product);
        this.snackBar.open(`Item added to cart!`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

}

