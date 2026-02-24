import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = false;
  colors: ThemePalette[] = ['primary', 'accent', 'warn'];
  selectedColor: ThemePalette = 'primary';
}
