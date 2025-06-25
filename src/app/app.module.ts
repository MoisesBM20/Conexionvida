import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeamComponent } from './components/team/team.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { StarsComponent } from './components/stars/stars.component';
import { GanefamilyComponent } from './components/ganefamily/ganefamily.component';
import { PensionerComponent } from './components/pensioner/pensioner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    TeamComponent,
    AgreementComponent,
    AttractionComponent,
    StarsComponent,
    GanefamilyComponent,
    PensionerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }