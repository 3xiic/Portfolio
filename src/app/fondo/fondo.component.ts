import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../language.service';
import { Translations } from '../translations';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrl: './fondo.component.css'
})
export class FondoComponent implements OnInit, OnDestroy {
  t!: Translations;
  displayText: string = '';

  private phrases: string[] = [];
  private phraseIndex: number = 0;
  private charIndex: number = 0;
  private isDeleting: boolean = false;
  private typeTimer: any = null;
  private reducedMotion: boolean = false;

  private readonly TYPE_MIN = 70;
  private readonly TYPE_MAX = 120;
  private readonly DELETE_SPEED = 50;
  private readonly PAUSE_COMPLETE = 2800;
  private readonly PAUSE_EMPTY = 400;

  constructor(private langService: LanguageService) {
    this.t = langService.data;
  }

  ngOnInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.phrases = this.t.hero.roles;

    this.langService.currentLang$.subscribe(() => {
      this.t = this.langService.data;
      this.phrases = this.t.hero.roles;
      this.resetTypewriter();
    });

    if (this.reducedMotion) {
      this.displayText = this.phrases[0];
    } else {
      this.tick();
    }
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }

  private resetTypewriter(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
    this.charIndex = 0;
    this.isDeleting = false;
    this.displayText = '';
    if (this.reducedMotion) {
      this.displayText = this.phrases[0];
    } else {
      this.tick();
    }
  }

  private tick(): void {
    const phrase = this.phrases[this.phraseIndex];
    let delay: number;

    if (!this.isDeleting) {
      this.charIndex = Math.min(this.charIndex + 1, phrase.length);
      this.displayText = phrase.slice(0, this.charIndex);

      if (this.charIndex === phrase.length) {
        this.isDeleting = true;
        delay = this.PAUSE_COMPLETE;
      } else {
        delay = this.rand(this.TYPE_MIN, this.TYPE_MAX);
      }
    } else {
      this.charIndex = Math.max(this.charIndex - 1, 0);
      this.displayText = phrase.slice(0, this.charIndex);

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        delay = this.PAUSE_EMPTY;
      } else {
        delay = this.DELETE_SPEED + this.rand(-10, 10);
      }
    }

    this.typeTimer = setTimeout(() => this.tick(), delay);
  }

  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
