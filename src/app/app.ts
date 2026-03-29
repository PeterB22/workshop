import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartViewComponent } from "./components/cart/cart-view/cart-view.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [RouterOutlet, CartViewComponent]
})
export class App {

    private roter = inject(Router);

    onHeaderClick(): void {
        this.roter.navigate(['/']);
    }
}
