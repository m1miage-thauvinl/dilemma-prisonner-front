import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TourPageComponent} from './components/tour-page/tour-page.component';
import {AcceuilPageComponent} from './components/acceuil-page/acceuil-page.component';
import {MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TourPageComponent, AcceuilPageComponent, MatTabNavPanel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dilemma-prisonner-front';
}
