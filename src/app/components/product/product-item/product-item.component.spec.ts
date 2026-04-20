import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProductItemComponent } from "./product-item.component";
import { createProduct } from "../../../core/models/product.model";
import { By } from "@angular/platform-browser";

const testProduct = createProduct({
    id: 1,
    title: 'Hard drive',
    description: 'Test description',
    price: 58.7,
    category: 'storage',
    image: 'test.jpg',
    rating: {
        rate: 4.5,
        count: 100
    }
});

const inCartProduct = {
  ...testProduct,
  isInCart: true
};

const notInCartProduct = {
  ...testProduct,
  isInCart: false
};

describe('ProductItemComponent', () => {
    let fixture: ComponentFixture<ProductItemComponent>;
    let component: ProductItemComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ProductItemComponent,
                RouterTestingModule
            ]
        });
        fixture = TestBed.createComponent(ProductItemComponent);
        component = fixture.componentInstance;
    });

    it('should show in-cart indicator when product is in cart', () => {
        fixture.componentRef.setInput('product', inCartProduct);
        fixture.detectChanges();
        const indicator = fixture.debugElement.query(By.css('.in-cart-indicator'));
        expect(indicator).toBeTruthy();
    });

    it('should NOT show in-cart indicator when product is not in cart', () => {
        fixture.componentRef.setInput('product', notInCartProduct);
        fixture.detectChanges();
        const indicator = fixture.debugElement.query(By.css('.in-cart-indicator'));
        expect(indicator).toBeNull();
    });

    it('should generate correct router link', () => {
        fixture.componentRef.setInput('product', testProduct);
        fixture.detectChanges();
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        expect(anchor.getAttribute('href')).toContain('/product/1');
    });

    it('should render product details', () => {
        fixture.componentRef.setInput('product', testProduct);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Hard driveTest description$58.70');
    });
});
