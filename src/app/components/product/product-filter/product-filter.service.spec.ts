import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductFilterService } from "./product-filter.service";
import { filterReducer } from "../../../core/store/filter/filter.reducer";
import { setSearchFilter } from "../../../core/store/filter/filter.actions";
import { ProductFilterComponent } from "./product-filter.component";
import { SearchComponent } from "./components/search/search.component";
import { CategoryComponent } from "./components/category/category.component";
import { By } from "@angular/platform-browser";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-price-range',
  standalone: true,
  template: ''
})
class MockPriceRangeComponent {
  @Input() rangeStart!: number | null;
  @Input() rangeEnd!: number | null;

  @Output() rangeChange = new EventEmitter<any>();
}

describe('ProductFilterService', () => {
  let fixture: ComponentFixture<ProductFilterComponent>;
  let component: ProductFilterComponent;
  let service: ProductFilterService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductFilterComponent
      ],
      providers: [
        ProductFilterService,
        provideMockStore({
          initialState: {
            filter: filterReducer(undefined, { type: '' }),
          }
        })
      ]
    }).overrideComponent(ProductFilterComponent, {
      set: {
        imports: [
          SearchComponent,
          CategoryComponent,
          MockPriceRangeComponent
        ],
      }
    }).compileComponents();
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductFilterService);
    store = TestBed.inject(MockStore);
    store.setState({
      filter: {
        searchTerm: 'Laptop',
        category: 'electronics',
        minPrice: 10,
        maxPrice: 100
      }
    });
  });

  it('should dispatch search filter', () => {
    spyOn(store, 'dispatch');

    service.updateKeywords('Laptop');

    expect(store.dispatch).toHaveBeenCalledWith(
      setSearchFilter({
        searchTerm: 'Laptop'
      })
    );
  });

  it('should pass keywords to search component', async () => {
    service.updateKeywords('Laptop');
    fixture.detectChanges();
    await fixture.whenStable();
    const search = fixture.debugElement.query(By.css('app-search'));
    expect(search.componentInstance.value()).toBe('Laptop');
  });

  it('should pass category to category component', async () => {
    service.updateCategory('electronics');
    fixture.detectChanges();
    await fixture.whenStable();
    const category = fixture.debugElement.query(By.css('app-category'));
    expect(category.componentInstance.value()).toBe('electronics');
  });

  it('should pass price range correctly', async () => {
    service.updatePrice({
      minPrice: 10,
      maxPrice: 100
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const price = fixture.debugElement.query(By.css('app-price-range'));
    expect(price.componentInstance.rangeStart).toBe(10);
    expect(price.componentInstance.rangeEnd).toBe(100);
  });

  it('should call updateKeywords when search emits', () => {
    spyOn(component, 'updateKeywords');
    const search = fixture.debugElement.query(By.css('app-search'));
    search.componentInstance.valueChange.emit('Laptop');
    expect(component.updateKeywords).toHaveBeenCalledWith('Laptop');
  });

  it('should call updateCategory when category emits', () => {
    spyOn(component, 'updateCategory');
    const category = fixture.debugElement.query(By.css('app-category'));
    category.componentInstance.valueChange.emit('electronics');
    expect(component.updateCategory).toHaveBeenCalledWith('electronics');
  });

  it('should call updatePrice when range changes', () => {
    spyOn(component, 'updatePrice');
    const price = fixture.debugElement.query(By.css('app-price-range'));
    price.componentInstance.rangeChange.emit({
      minPrice: 10,
      maxPrice: 100
    });
    expect(component.updatePrice).toHaveBeenCalledWith({
      minPrice: 10,
      maxPrice: 100
    });
  });
});