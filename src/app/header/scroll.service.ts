import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new BehaviorSubject<number>(0);

  constructor() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll(): void {
    this.scrollSubject.next(window.pageYOffset);
  }

  getScroll(): BehaviorSubject<number> {
    return this.scrollSubject;
  }
}
