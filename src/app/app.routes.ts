import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/product/product-search/product-search.component').then(m => m.ProductSearchComponent)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./components/product/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
    },
    {
        path: '**',
        redirectTo: '',
    },
];
