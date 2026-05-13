import { InjectionToken, Signal } from "@angular/core";
import { Product } from "../../../core/models/product.model";

export const PRODUCT_DATASOURCE = new InjectionToken<ProductDatasourceDef>('PRODUCT_DATASOURCE');

export interface ProductDatasourceDef {
  product: Signal<Product | undefined>;
  isInCart: Signal<boolean | undefined>;
  addToCart(product: Product):  void;
}
