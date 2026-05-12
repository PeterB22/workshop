import { render, screen } from "@testing-library/angular";
import { describe, it, expect } from "vitest";
import { CartItemComponent } from "./cart-item.component";

describe(CartItemComponent.name, () => {
    it('renders product name', async () => {
        await render(CartItemComponent, {
            componentInputs: {
                item: {
                    product: { id: 1, name: 'Apple' },
                    quantity: 1,
                },
            },
        });
        expect.soft(screen.getByText('Apple')).toBeInTheDocument();
        expect.soft(screen.getByText('Remove')).toBeInTheDocument();
    });
});
