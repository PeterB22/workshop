import { Component, ElementRef, ViewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
    protected filterFormGroup = new FormGroup({
        keywords: new FormControl(),
        numberOfUsers: new FormControl(),
        maxStepCount: new FormControl(),
    });

    filterChange = outputFromObservable(
        this.filterFormGroup.valueChanges.pipe(
            map((value) => value),
        ),
    );

    @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[] = this.options.slice();

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }
}

