import { Component, input, output } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    imports: [MatFormFieldModule, MatIcon, MatInputModule]
})
export class SearchComponent {
    value = input<string | null>();
    valueChange = output<string | null>();
}