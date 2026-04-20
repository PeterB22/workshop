import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartDetailComponent } from "./cart-detail.component";
import { CartDatasource } from "./cart-detail.datasource.service";
import { CartDatasourceFake, provideCartDatasourceFake } from "./cart-detail.datasource.service.fake";
import { MockProvider } from "ng-mocks";
import { OverlayRef } from "@angular/cdk/overlay";
import { Product } from "../../../core/models/product.model";

describe(CartDetailComponent.name, () => {
  let datasource: CartDatasourceFake;
  let fixture: ComponentFixture<CartDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartDetailComponent],
    }).overrideComponent(CartDetailComponent, {
      set: {
        providers: [
          provideCartDatasourceFake(),
          MockProvider(OverlayRef)
        ]
      }
    });
    fixture = TestBed.createComponent(CartDetailComponent);
    datasource = fixture.debugElement.injector.get(CartDatasource) as unknown as CartDatasourceFake;
  });

  it('disables checkout when cart empty', () => {
    datasource.setCartItems([]);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('enables checkout when cart is not empty', () => {
    datasource.setCartItems([{ product: { id: '1', name: 'laptop', price: 100 } as Product, quantity: 5 }]);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
  });
});
