import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { describe, it, beforeEach } from 'vitest';
import { CartDetailComponent } from "./cart-detail.component";
import { MockProvider } from 'ng-mocks';
import { provideCartDatasourceFakeStandalone } from './cart-detail.datasource.service.fake';

describe('Test suite', () => {

  let fixture: ComponentFixture<CartDetailComponent>;
  let datasource = provideCartDatasourceFakeStandalone();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartDetailComponent],
    }).overrideComponent(CartDetailComponent, {
      set: {
        providers: [
          MockProvider(OverlayRef),
          datasource.provider
        ]
      }
    });
    fixture = TestBed.createComponent(CartDetailComponent);
  });

  it.todo('🚧 Test goes here', () => { });
});
