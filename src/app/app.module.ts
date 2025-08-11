import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { MadeprojectsComponent } from './madeprojects/madeprojects.component';
import { ExperienceComponent } from './experience/experience.component';
import { FondoComponent } from './fondo/fondo.component';
import { IpService } from './ip.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SkillsComponent,
    AboutComponent,
    MadeprojectsComponent,
    ExperienceComponent,
    FondoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [IpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
