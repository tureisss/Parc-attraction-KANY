import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  getLocale(): string {
    return localStorage.getItem('locale') || 'fr';
  }

  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
  }
}
