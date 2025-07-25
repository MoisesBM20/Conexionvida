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
import { BPhysicalComponent } from './components/ring/bphysical/bphysical.component';
import { BMentalComponent } from './components/ring/bmental/bmental.component';
import { BEducationalComponent } from './components/ring/beducational/beducational.component';
import { BFinancialComponent } from './components/ring/bfinancial/bfinancial.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';

import { FormsModule } from '@angular/forms'; // Import FormsModule

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
    BPhysicalComponent,
    BMentalComponent,
    BEducationalComponent,
    BFinancialComponent,
    PruebasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }