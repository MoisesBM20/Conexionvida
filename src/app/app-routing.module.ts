import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './components/team/team.component';
import { HeroComponent } from './components/hero/hero.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { StarsComponent } from './components/stars/stars.component';
import { GanefamilyComponent } from './components/ganefamily/ganefamily.component';


const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: '', component: HeroComponent },
  { path: 'team', component: TeamComponent },
  { path: 'agreement', component: AgreementComponent },
  { path: 'attraction', component: AttractionComponent },
  { path: 'stars', component: StarsComponent },
  { path: 'ganefamily', component: GanefamilyComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
