import { CartDatasource } from "./cart-detail.datasource.service";
import { TestBed } from "@angular/core/testing";
import { cartReducer } from "../../../core/store/cart/cart.reducer";
import { LocalStorageService } from "../../../core/providers/localstorage.service";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectCartItems } from "../../../core/store/cart/cart.selectors";
import { Product } from "../../../core/models/product.model";
import { filterReducer } from "../../../core/store/filter/filter.reducer";

describe('CartDatasource', () => {
  let datasource: CartDatasource;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartDatasource,
        LocalStorageService,
        provideMockStore({
          initialState: {
            cart: cartReducer(undefined, { type: '' }),
            filter: filterReducer(undefined, { type: '' }),
          }
        })
      ]
    });

    datasource = TestBed.inject(CartDatasource);
    store = TestBed.inject(MockStore);
  });

  it('should calculate total', () => {
    store.overrideSelector(selectCartItems, [
      {
        product: { id: '1', name: 'Laptop', price: 10 } as Product,
        quantity: 2
      }
    ]);
    store.refreshState();
    expect(datasource.total()).toBe(20);
  });
});