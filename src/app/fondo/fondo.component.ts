import { Component } from '@angular/core';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrl: './fondo.component.css'
})
export class FondoComponent {
  currentText: string = '<>Developer</>';
  texts: string[] = ['<>Developer</>', '<>Competitive Programmer</> ', '<>Student</>'];
  textIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.startTextAnimation();
  }

  startTextAnimation(): void {
    setInterval(() => {
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      this.currentText = this.texts[this.textIndex];
    }, 4000);
  }
}
