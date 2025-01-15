import {Component, computed, Signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {PartieService} from '../../services/partie.service';
import { JoueurService } from '../../services/joueur.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [
  ],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})
export class AcceuilPageComponent {

  constructor(private joueurService : JoueurService, private router : Router) {
  }
  ngOnInit() {

  }
  jouer() {
    this.router.navigate(['/lancement-partie'])
  }
}
