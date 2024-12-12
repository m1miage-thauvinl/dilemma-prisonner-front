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
  numTour: number = 0;
  partieFinie = signal<boolean>(false);

  //a mettre en input
  @Input({required : true}) isJoueur1 =signal<number>(0);
  @Input({required : true}) idJoueur =signal<number>(0);
  @Input({required:true}) strategieChoisie = signal<string>("Toujours coopérer");
  @Input({required:true}) nbTourTotal = signal<number>(0);
  scoreTotalJoueur: number=0;

  decisionAdversaire : string = "Cooperer";
  pointsGagnes : number = 0;


  constructor(private tourService : TourService, private partieService : PartieService, private joueurService : JoueurService, private router : Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    const id : string | null = this.route.snapshot.paramMap.get('idJoueur');
    if(id) this.isJoueur1.set(parseInt(id, 10));

  }

  trahir() {
      this.tourService.postJouer(this.idJoueur(), "TRAHIR").then(points => {
        this.pointsGagnes = points;
        this.joueurService.getScoreJoueur(this.idJoueur()).then(score => {
          this.scoreTotalJoueur = score;
        });
      });
      this.numTour++;
  }

  cooperer() {
    this.tourService.postJouer(this.idJoueur(), "COOPERER").then(points => {
      this.pointsGagnes = points;
      this.joueurService.getScoreJoueur(this.idJoueur()).then(score => {
        this.scoreTotalJoueur = score;
      });
    });
    this.numTour++;
  }


  quitterPartie() {
    this.joueurService.postPartieFinie(this.idJoueur(), this.strategieChoisie())
    this.partieFinie.set(true)
    this.router.navigate(["/acceuil"])
  }


  isPartieFinie() {
    return this.partieFinie;
  }
}
