import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PRODUCT_STORE_API } from '../api-config';
import { map, Observable, tap } from 'rxjs';
import { createProduct, Product, ProductDTO, ProductListDTO } from '../models/product.model';

@Injectable()
export class ProductSearchService {
    private httpClient = inject(HttpClient);  
    
    getProducts(): Observable<Product[]> {
        return this.httpClient.get<ProductListDTO>(`${PRODUCT_STORE_API}`).pipe(
            map((response: ProductListDTO) => {
                return response.map(createProduct);
            })
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.httpClient.get<ProductDTO>(`${PRODUCT_STORE_API}/${id}`).pipe(
            map((response: ProductDTO) => {
                return createProduct(response);
            })
        );
    }
}