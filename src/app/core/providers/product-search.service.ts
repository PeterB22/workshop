import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PRODUCT_STORE_API } from '../api-config';
import { catchError, map, Observable, of } from 'rxjs';
import mockProducts from '../../testing/mock_products.json';
import { createProduct, Product, ProductDTO, ProductListDTO } from '../models/product.model';

@Injectable()
export class ProductSearchService {
    private httpClient = inject(HttpClient);  
    
    getProducts(): Observable<Product[]> {
        return this.httpClient.get<ProductListDTO>(`${PRODUCT_STORE_API}`).pipe(
            map((response: ProductListDTO) => {
                return response.map(createProduct);
            }),
            catchError((error) => {
                console.error('Error fetching products:', error);
                return of((mockProducts as ProductDTO[]).map(createProduct));
            })
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.httpClient.get<ProductDTO>(`${PRODUCT_STORE_API}/${id}`).pipe(
            map((response: ProductDTO) => {
                return createProduct(response);
            }),
            catchError((error) => {
                console.error('Error fetching product:', error);
                const singleProduct = mockProducts.find((product) => product.id === parseInt(id));
                return of(createProduct(singleProduct as ProductDTO));
            })
        );
    }
}