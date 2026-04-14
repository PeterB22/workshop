import { Component, effect, input, output, signal } from '@angular/core';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-price-range',
    templateUrl: './price-range.component.html',
    styleUrls: ['./price-range.component.scss'],
    imports: [NgxSliderModule]
})
export class PriceRangeComponent {
    rangeStart = input<number | null>();
    rangeEnd = input<number | null>();
    rangeChange = output<{ minPrice: number; maxPrice: number }>();
    localStart = signal(0);
    localEnd = signal(100);
    options: Options = {
        floor: 0,
        ceil: 100,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                default:
                    return "$" + value;
            }
        },
        getSelectionBarColor: () => '#f3dde1',
        getPointerColor: () => '#f3dde1'
    };

    constructor() {
        effect(() => {
            this.localStart.set(this.rangeStart() ?? 0);
            this.localEnd.set(this.rangeEnd() ?? 100);
        });
    }

    onStartChange(value: number) {
        this.localStart.set(value);
        this.emitChange();
    }

    onEndChange(value: number) {
        this.localEnd.set(value);
        this.emitChange();
    }

    private emitChange() {
        this.rangeChange.emit({
            minPrice: this.localStart(),
            maxPrice: this.localEnd()
        });
    }
}