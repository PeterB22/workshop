import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { ProductSearchComponent } from './product-search.component';
import { ProductSearchDatasource } from "./product-search.datasource.service";
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { productReducer } from "../../../core/store/product/product.reducer";
import { filterReducer } from "../../../core/store/filter/filter.reducer";
import { By } from "@angular/platform-browser";
import { ProductSearchService } from "../../../core/providers/product-search.service";
import { cartReducer } from "../../../core/store/cart/cart.reducer";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectAllProducts } from "../../../core/store/product/product.selectors";
import { ProductWithExtensions } from "../../../core/models/product.model";

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        ProductSearchComponent,
      ],
      providers: [
        ProductSearchDatasource,
        ProductSearchService,
        provideMockStore({
          initialState: {
            product: productReducer(undefined, { type: '' }),
            filter: filterReducer(undefined, { type: '' }),
            cart: cartReducer(undefined, { type: '' }),
          }
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should render products', () => {
    const products = [{ id: '1', name: 'Laptop', price: 1000 }] as ProductWithExtensions[]
    store.overrideSelector(selectAllProducts, products);
    store.refreshState();
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-product-item'));

    expect(items.length).toBe(1);
  });
});