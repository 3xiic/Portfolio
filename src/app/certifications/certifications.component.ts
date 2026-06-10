import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Translations } from '../translations';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {
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
