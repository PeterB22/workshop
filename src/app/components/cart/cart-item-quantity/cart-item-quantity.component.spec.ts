import { CartItemQuantityComponent } from "./cart-item-quantity.component";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

describe(CartItemQuantityComponent.name, () => {
    it('emits increase event', async () => {
        const user = userEvent.setup();

        const { fixture } = await render(CartItemQuantityComponent, {
            componentInputs: {
                item: {
                    product: {
                        id: 'apple-1',
                        name: 'Apple',
                    },
                    quantity: 1,
                },
            },
        });

        const emitSpy = vi.spyOn(fixture.componentInstance.quantityChange, 'emit');

        const addIcon = screen.getByText('add');

        await user.click(addIcon);

        expect(emitSpy).toHaveBeenCalledWith({
            productId: 'apple-1',
            change: 'increase',
        });
    });

    it('emits decrease event', async () => {
        const user = userEvent.setup();

        const { fixture } = await render(CartItemQuantityComponent, {
            componentInputs: {
                item: {
                    product: {
                        id: 'apple-1',
                        name: 'Apple',
                    },
                    quantity: 2,
                },
            },
        });

        const emitSpy = vi.spyOn(fixture.componentInstance.quantityChange, 'emit');

        const removeIcon = screen.getByText('remove');

        await user.click(removeIcon);

        expect(emitSpy).toHaveBeenCalledWith({
            productId: 'apple-1',
            change: 'decrease',
        });
    });
});
