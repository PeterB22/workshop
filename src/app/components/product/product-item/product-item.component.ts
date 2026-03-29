import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductWithExtensions } from '../../../core/models/product.model';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    imports: [RouterLink]
})
export class ProductItemComponent {
    product = input.required<ProductWithExtensions>();
}
