import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Translations } from '../translations';

@Component({
  selector: 'app-lifeguard',
  templateUrl: './lifeguard.component.html',
  styleUrl: './lifeguard.component.css'
})
export class LifeguardComponent implements OnInit {
  t!: Translations;

  constructor(private langService: LanguageService) {
    this.t = langService.data;
  }

  ngOnInit(): void {
    this.langService.currentLang$.subscribe(() => {
      this.t = this.langService.data;
    });
  }
}
