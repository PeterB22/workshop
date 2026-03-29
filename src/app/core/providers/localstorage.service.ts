
import { inject, Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private cartIndex = 0;
    setItem(key: string, value: any): void {
        localStorage.setItem(key + this.cartIndex, JSON.stringify(value));
        this.cartIndex++;
    }

    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    }
}