import { ProductDetailComponent } from './product-detail.component';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/angular';
import { provideProductDatasourceFake } from './product-datasource.service.fake';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgRatings } from 'ng-ratings';
import { ProductImageComponent } from '../../../shared/product-image/product-image.component';
import { createProduct } from '../../../core/models/product.model';
import { mockProductDTO } from '../../../testing/mock-product';

describe(ProductDetailComponent.name, () => {

  it('should add product to cart and open snackbar', async () => {
    const { user, snackBarSpy } = await setup();
    const button = await screen.findByRole('button', { name: 'Add to Cart', hidden: true });
    debugger;
    await user.click(button);
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Item added to cart!',
      'Close',
      expect.objectContaining({
        duration: 3000,
      })
    );
  });


  async function setup() {
    const user = userEvent.setup();
    const ds = provideProductDatasourceFake();
    const snackBarSpy = {
      open: vi.fn()
    };
    await render(ProductDetailComponent, {
      componentProviders: [
        ds.provider,
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: snackBarSpy
        }
      ],
      imports: [
        ProductImageComponent,
        NgRatings,
      ],
      configureTestBed() {
        ds.fake.configure(createProduct(mockProductDTO));
      },
    });
    return {
      user,
      snackBarSpy
    };
  }
});
