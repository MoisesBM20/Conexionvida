import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './components/team/team.component';
import { HeroComponent } from './components/hero/hero.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { StarsComponent } from './components/stars/stars.component';
import { GanefamilyComponent } from './components/ganefamily/ganefamily.component';
import { PensionerComponent } from './components/pensioner/pensioner.component';

// Rutas para los componentes del anillo
import { BPhysicalComponent } from './components/ring/bphysical/bphysical.component';
import { BMentalComponent } from './components/ring/bmental/bmental.component';
import { BEducationalComponent } from './components/ring/beducational/beducational.component';
import { BFinancialComponent } from './components/ring/bfinancial/bfinancial.component';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: '', component: HeroComponent },
  { path: 'team', component: TeamComponent },
  { path: 'agreement', component: AgreementComponent },
  { path: 'attraction', component: AttractionComponent },
  { path: 'stars', component: StarsComponent },
  { path: 'ganefamily', component: GanefamilyComponent },
  { path: 'pensioner', component: PensionerComponent },

  // Rutas para los componentes del anillo
  { path: 'bphysical', component: BPhysicalComponent },
  { path: 'bmental', component: BMentalComponent },
  { path: 'beducational', component: BEducationalComponent },
  { path: 'bfinancial', component: BFinancialComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
