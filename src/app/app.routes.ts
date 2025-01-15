import { Routes } from '@angular/router';
import {TourPageComponent} from './components/tour-page/tour-page.component';
import {AcceuilPageComponent} from './components/acceuil-page/acceuil-page.component';
import {LancementPartiePageComponent} from './components/lancement-partie-page/lancement-partie-page.component';

export const routes: Routes = [
  {path: 'tour-jeu', title: 'Jeu', component: TourPageComponent},
  {path: 'acceuil', title: 'Acceuil', component: AcceuilPageComponent},
  {path: 'lancement-partie', title: 'Lancement Partie', component: LancementPartiePageComponent},
  {path : '**', redirectTo : '/acceuil'}
];
