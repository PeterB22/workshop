import { Component, computed, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    imports: [MatFormFieldModule, MatAutocompleteModule, MatInput, MatLabel]
})
export class CategoryComponent {

    @ViewChild(MatInput, { read: ElementRef }) input!: ElementRef<HTMLInputElement>;
    value = input<string | null>();
    valueChange = output<string | null>();
    query = signal('');
    categories: string[] = ['home', 'electronics', 'men\'s clothing', 'women\'s clothing'];

    constructor() {
        effect(() => {
            this.query.set(this.value() ?? '');
        });
    }

    filteredCategories = computed(() => {
        const query = this.query().toLowerCase();
        return this.categories.filter(c =>
            c.toLowerCase().includes(query)
        );
    });

    onSelected(value: string) {
        const valueToEmit = value === this.value() ? null : value.toLowerCase();
        if (!valueToEmit) {
            this.query.set('');
            this.input.nativeElement.value = '';
        }
        this.valueChange.emit(valueToEmit);
    }

    onTyping(value: string) {
        this.query.set(value);
        this.valueChange.emit(null);
    }
}