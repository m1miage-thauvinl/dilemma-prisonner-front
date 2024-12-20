import {Component, computed, Input, signal, Signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {PartieService} from '../../services/partie.service';
import {StrategieService} from '../../services/strategie.service';

@Component({
  selector: 'app-lancement-partie-page',
  standalone: true,
  imports: [
    NgIf,
    MatSelect,
    MatOption,
    MatFormField,
    MatButton
  ],
  templateUrl: './lancement-partie-page.component.html',
  styleUrl: './lancement-partie-page.component.css'
})
export class LancementPartiePageComponent {

  isPremierJoueur = signal<boolean>(false);
  isDeuxiemeJoueur  = signal<boolean>(false);
  @Input ({required : true})
    get v() {return this.isPremierJoueur()}
    set v(b : boolean){this.isPremierJoueur.set(b)}
  @Input ({required : true})
    get z() {return this.isDeuxiemeJoueur()}
    set z(b : boolean){this.isDeuxiemeJoueur.set(b)}
  strategies: string[] = [];
  constructor(private partieService : PartieService, private strategieService : StrategieService, private router : Router, private route: ActivatedRoute) {
    this.strategies = this.strategieService.getAllStrategies();
  }
  ngOnInit() {
    const isPrem : boolean = this.route.snapshot.paramMap.get('isPrem') == "true";
    const isDeux : boolean = this.route.snapshot.paramMap.get('isDeux') == "true";
    this.isPremierJoueur.set(isPrem)
    this.isDeuxiemeJoueur.set(isDeux)
  }
  rejoindre() {
    this.router.navigate(["/tour-jeu", 1])
  }

  jouer() {
    this.router.navigate(["/tour-jeu", 0])
  }
}
