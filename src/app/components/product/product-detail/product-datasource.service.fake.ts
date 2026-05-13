import { Injectable, makeEnvironmentProviders, signal, Signal, WritableSignal } from "@angular/core";
import { Product } from "../../../core/models/product.model";
import { PRODUCT_DATASOURCE, ProductDatasourceDef } from "./product-datasource-types";

@Injectable()
export class ProductDatasourceFake implements ProductDatasourceDef {
  product: WritableSignal<Product | undefined> = signal(undefined);
  isInCart: WritableSignal<boolean> = signal(false);

  addToCart(product: Product): void {
    this.isInCart.set(true);
  }

  configure(product: Product) {
    debugger;
    this.product.set(product);
  }
}


export function provideProductDatasourceFake() {
  const fake = new ProductDatasourceFake();
  return {
    fake,
    provider: {
      provide: PRODUCT_DATASOURCE,
      useValue: fake
    }
  };
}
