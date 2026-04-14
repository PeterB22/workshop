import { Component, inject, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductSearchDatasource } from './product-search.datasource.service';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.scss'],
    imports: [ProductListComponent, ProductItemComponent, ProductFilterComponent],
    providers: [ProductSearchDatasource]
})
export class ProductSearchComponent implements OnInit {
    private datasource = inject(ProductSearchDatasource);
    products = this.datasource.products;

    ngOnInit(): void {
        this.datasource.loadProducts();
    }
}
