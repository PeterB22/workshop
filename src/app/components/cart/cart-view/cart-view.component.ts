import { Component, HostListener, inject, Injector } from '@angular/core';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../../../core/store/cart/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComponentPortal } from '@angular/cdk/portal';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';

@Component({
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrls: ['./cart-view.component.scss'],
    imports: [MatIconModule, OverlayModule, MatIconModule, MatBadgeModule]
})
export class CartViewComponent {

    private overlay = inject(Overlay);
    private store = inject(Store);
    private injector = inject(Injector);

    cartCount = toSignal(this.store.select(selectCartCount));

    @HostListener('click')
    onClick(): void {
        this.openOverlay();
    }

    openOverlay(): void {
        const overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy: this.overlay.position().flexibleConnectedTo({ x: window.innerWidth - 40, y: 40 }).withPositions([
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'top',
                }
            ]) 
        });
        const injector = Injector.create({
            providers: [
                { provide: OverlayRef, useValue: overlayRef }
            ],
            parent: this.injector
        });
        const cartDetailPortal = new ComponentPortal(CartDetailComponent, null, injector);
        overlayRef.attach(cartDetailPortal);

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose();
        });
    }
}