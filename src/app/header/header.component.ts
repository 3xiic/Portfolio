import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from './scroll.service';
import { LanguageService } from '../language.service';
import { Translations } from '../translations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public scrollSubscription!: Subscription;
  public isScrolled: boolean = false;
  t!: Translations;

  constructor(
    private scrollService: ScrollService,
    private langService: LanguageService
  ) {
    this.t = langService.data;
  }

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.getScroll().subscribe(scrollPosition => {
      this.isScrolled = scrollPosition > 0;
    });

    this.langService.currentLang$.subscribe(() => {
      this.t = this.langService.data;
    });
  }

  get currentLang() {
    return this.langService.currentLang;
  }

  toggleLang() {
    this.langService.toggle();
  }
}
