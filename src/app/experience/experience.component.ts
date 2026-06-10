import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Translations } from '../translations';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
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
