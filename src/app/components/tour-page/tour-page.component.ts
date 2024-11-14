import {Component, Input, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {TourService} from '../../services/tour.service';
import {PartieService} from '../../services/partie.service';
import {JoueurService} from '../../services/joueur.service';
import {MatCard} from '@angular/material/card';
import {MatFabButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tour-page',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatFabButton
  ],
  templateUrl: './tour-page.component.html',
  styleUrl: './tour-page.component.css'
})
export class TourPageComponent {
  numTour: number;
  nbTourTotal: number;
  partieFinie = signal<boolean>(false);

  //a mettre en input

  @Input({required : true}) idJoueur =signal<number>(0);
  scoreTotalJoueur: number;

  decisionAdversaire : string = "Cooperer";
  pointsGagnes : number = 0;


  constructor(private tourService : TourService, private partieService : PartieService, private joueurService : JoueurService, private router : Router, private route: ActivatedRoute) {
    this.numTour = this.tourService.getNumTourCourant();
    this.nbTourTotal= this.tourService.getNbTourTotal();
    this.scoreTotalJoueur = this.joueurService.getScoreJoueur(this.idJoueur());
  }
  ngOnInit() {
    const id : string | null = this.route.snapshot.paramMap.get('idJoueur');
    if(id) this.idJoueur.set(parseInt(id, 10));

  }

  trahir() {
      this.pointsGagnes = this.tourService.postJouer(this.idJoueur(), "Trahir")
  }

  cooperer() {
    this.tourService.postJouer(this.idJoueur(), "Cooperer")
  }


  quitterPartie() {
    this.partieService.postPartieFinie()
    this.partieFinie.set(true)
    this.router.navigate(["/acceuil"])
  }


  isPartieFinie() {
    return this.partieFinie;
  }
}
