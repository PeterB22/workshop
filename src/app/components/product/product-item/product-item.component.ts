import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductWithExtensions } from '../../../core/models/product.model';
import { ProductImageComponent } from '../../../shared/product-image/product-image.component';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    imports: [RouterLink, ProductImageComponent, CurrencyPipe]
})
export class ProductItemComponent {
    product = input.required<ProductWithExtensions>();
}
