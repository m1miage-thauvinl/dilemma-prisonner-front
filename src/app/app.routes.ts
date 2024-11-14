import { Routes } from '@angular/router';
import {TourPageComponent} from './components/tour-page/tour-page.component';
import {AcceuilPageComponent} from './components/acceuil-page/acceuil-page.component';
import {LancementPartiePageComponent} from './components/lancement-partie-page/lancement-partie-page.component';

export const routes: Routes = [
  {path: 'tour-jeu/:idJoueur', title: 'Jeu', component: TourPageComponent},
  {path: 'acceuil', title: 'Acceuil', component: AcceuilPageComponent},
  {path: 'lancement-partie/:isPrem/:isDeux', title: 'Lancement Partie', component: LancementPartiePageComponent},
  {path : '**', redirectTo : '/acceuil'}
];
