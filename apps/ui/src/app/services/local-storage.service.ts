import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  getItem(key: string): string | null {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? storedItem : null;
    } catch (error) {
      console.error('Error getting from local storage', error);
      return null;
    }
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from local storage', error);
    }
  }
}
