import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS, Lang, Translations } from './translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private lang$ = new BehaviorSubject<Lang>('es');

  currentLang$ = this.lang$.asObservable();

  get currentLang(): Lang {
    return this.lang$.value;
  }

  get data(): Translations {
    return TRANSLATIONS[this.lang$.value];
  }

  toggle(): void {
    this.lang$.next(this.lang$.value === 'en' ? 'es' : 'en');
  }
}
