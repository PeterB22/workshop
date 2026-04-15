import { TestBed } from '@angular/core/testing';
import { ProductSearchService } from './product-search.service';

describe(ProductSearchService.name, () => {
  let service: ProductSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ProductSearchService]
    });
    service = TestBed.inject(ProductSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});