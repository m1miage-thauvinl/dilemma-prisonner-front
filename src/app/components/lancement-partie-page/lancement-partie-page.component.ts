import {Component, computed, Input, signal, Signal} from '@angular/core';
import {JsonPipe, NgIf} from '@angular/common';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {PartieService} from '../../services/partie.service';
import {StrategieService} from '../../services/strategie.service';
import { JoueurService } from '../../services/joueur.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Joueur, Partie} from '../../interfaces/interfaces';
@Component({
  selector: 'app-lancement-partie-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatSelect,
    MatOption,
    MatFormField,
    MatButton,
    JsonPipe
  ],
  templateUrl: './lancement-partie-page.component.html',
  styleUrl: './lancement-partie-page.component.css'
})

export class LancementPartiePageComponent {
  strategies : string[] = ["Toujours coopérer", "Toujours trahir", "Aléatoire"]
  joueur1 = signal<Joueur>({
    id : "joueur1",
    strategy : "Toujours coopérer",
    score : 0,
    hasLeaved : false
  })
  joueur2 = signal<Joueur>({
    id : "joueur2",
    strategy : "Toujours trahir",
    score : 0,
    hasLeaved : false
  })
  nbTours = signal<number>(1)
  readonly partieState = computed<Partie>(()=> {
    return{
      nbTours : this.nbTours(),
      joueurs : [this.joueur1(), this.joueur2()],
      isActive : true
    }
  })
  constructor(private router : Router) {
  }

  demarrerPartie() {
    const partieStateStringified : string = encodeURIComponent(JSON.stringify(this.partieState()))
    this.router.navigate(['/tour-jeu'],{queryParams: {partieState: partieStateStringified}})
  }
}
