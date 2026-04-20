import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartDetailComponent } from './cart-detail.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockProvider } from 'ng-mocks';
import { MatButtonModule } from "@angular/material/button";
import { CartDatasource } from "./cart-detail.datasource.service";
import { By } from "@angular/platform-browser";
import { LocalStorageService } from "../../../core/providers/localstorage.service";
import { OverlayRef } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";

describe('CartDetailComponent', () => {
  let component: CartDetailComponent;
  let fixture: ComponentFixture<CartDetailComponent>;
  let store: MockStore;
  let cartDatasourceMock = {
    checkout: jasmine.createSpy('checkout'),
    cartItems: jasmine.createSpy('cartItems').and.returnValue([{ product: { id: '1', name: 'Laptop', price: 1000 }, quantity: 1 }]),
    total: jasmine.createSpy('total').and.returnValue(1000),
    isCheckoutDisabled: jasmine.createSpy('isCheckoutDisabled').and.returnValue(false),
    increaseQuantity: jasmine.createSpy('increaseQuantity'),
    decreaseQuantity: jasmine.createSpy('decreaseQuantity')
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        CartDetailComponent
      ],
      providers: [
        LocalStorageService,
        MockProvider(OverlayRef),
        provideMockStore({
          initialState: {
            cart: {
              items: [{
                product: { id: '1', name: 'Laptop', price: 1000 },
                quantity: 1
              }]
            }
          }
        })
      ]
    })
      .overrideComponent(CartDetailComponent, {
        set: {
          providers: [
            { provide: CartDatasource, useValue: cartDatasourceMock }
          ]
        }
      }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(
      CartDetailComponent
    );
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should dispatch checkout when button is clicked', async () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
    button.click();
    expect(cartDatasourceMock.checkout).toHaveBeenCalledTimes(1);
  });

  it('should increase quantity', () => {
    component.quantityChange({ productId: '1', change: 'increase' });
    expect(cartDatasourceMock.increaseQuantity).toHaveBeenCalledTimes(1);
  });

  it('should decrease quantity', () => {
    component.quantityChange({ productId: '1', change: 'decrease' });
    expect(cartDatasourceMock.decreaseQuantity).toHaveBeenCalledTimes(1);
  });
});
