import {Component, computed, Signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {PartieService} from '../../services/partie.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})
export class AcceuilPageComponent {
  isPremierJoueur : Signal<boolean> = computed(()=>false);
  isDeuxiemeJoueur : Signal<boolean> = computed(()=>false);
  constructor(private partieService : PartieService, private router : Router) {
    this.isPremierJoueur = computed(()=>this.partieService.postNewJoueur()==0);
    this.isDeuxiemeJoueur = computed(()=>this.partieService.postNewJoueur()==1);
  }
  jouer() {
    this.router.navigate(['/lancement-partie', this.isPremierJoueur(), this.isDeuxiemeJoueur()])
  }
}
