import {Component, computed, Input, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {TourService} from '../../services/tour.service';
import {PartieService} from '../../services/partie.service';
import {JoueurService} from '../../services/joueur.service';
import {MatCard} from '@angular/material/card';
import {MatFabButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {Joueur, Partie} from '../../interfaces/interfaces';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-tour-page',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatFabButton,
    JsonPipe
  ],
  templateUrl: './tour-page.component.html',
  styleUrl: './tour-page.component.css'
})
export class TourPageComponent {
  partieState = signal<Partie>({
    nbTours : 0,
    joueurs : [],
    isActive : false
  });
  numTour : number =0;
  joueurCourant = signal<Joueur>({
    id :"unknown",
    strategy : "unknown",
    score : 0,
    hasLeaved : false
});

  decisions : string[] = ['unknown', 'unknown']
  constructor(private route: ActivatedRoute, private router : Router) {
    this.numTour =0;

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['partieState']) {
        const decodedState = decodeURIComponent(params['partieState']);
        this.partieState.set(JSON.parse(decodedState));
        this.joueurCourant.set(this.partieState().joueurs[0])
      }
    });
  }
  faireChoix(strategy: string) {
    //"Toujours coopérer", "Toujours trahir", "Aléatoire"
    let choix : string = ''
    if(strategy.toLowerCase() == "Toujours coopérer".toLowerCase()){
      choix = 'cooperer'
    }else if(strategy.toLowerCase()==="Toujours trahir".toLowerCase()){
      choix = 'trahir'
    }else{
      let i : number =Math.random()%2
      if(i==0)
        choix='trahir'
    }
    return choix
  }
  mettreAJourScore(scores : number[]){
    const p = this.partieState(); // Get the current state of the partie
    const newPartieState = {
      ...p, // Spread the existing partie state
      joueurs: p.joueurs.map((joueur, index) => {
        // Update the score for the first and second player
        if (joueur === p.joueurs[0]) {
          return {
            ...joueur,
            score: p.joueurs[0].score + scores[0], // Update the score for the first player
          };
        } else if (joueur === p.joueurs[1]) {
          return {
            ...joueur,
            score: p.joueurs[1].score + scores[1], // Update the score for the second player
          };
        }
        return joueur; // Return the player as is if neither condition matches
      })
    };
    this.partieState.set(newPartieState);
  }
  jouer(choix: string) {
    const joueurAdverse : Joueur = this.partieState().joueurs.filter((joueur)=>joueur!=this.joueurCourant())[0]
      if (this.joueurCourant() == this.partieState().joueurs[0]) {
        if(!this.partieState().joueurs[1].hasLeaved) {
          this.decisions[0] = choix;
          this.joueurCourant.set(this.partieState().joueurs[1])
        }else{
          this.decisions[0] = choix
          const choixbot = this.faireChoix(this.partieState().joueurs[1].strategy.toLowerCase())
          let scores: number[] = this.calculerScore([choix, choixbot])
          this.mettreAJourScore(scores)
          this.numTour++
        }
      } else {
        if(!this.partieState().joueurs[1].hasLeaved) {
          this.decisions[1] = choix;
          let scores: number[] = this.calculerScore(this.decisions)
          this.mettreAJourScore(scores)
          this.joueurCourant.set(this.partieState().joueurs[0])
          this.numTour++
        }else{
            this.decisions[1] = choix;
            this.decisions[0] = this.faireChoix(this.partieState().joueurs[0].strategy)
            let scores: number[] = this.calculerScore(this.decisions)
            this.mettreAJourScore(scores)
            this.numTour++
        }
      }
    if(this.numTour===this.partieState().nbTours){
      this.router.navigate(['/acceuil'])
    }
  }
  calculerScore(decisions: string[]) {
    let scores : number[] = [0,0]
    if(decisions[0]=='cooperer'&&decisions[1]=='cooperer'){
      scores = [3,3]
    }else if(decisions[0]=='cooperer'&&decisions[1]=='trahir'){
      scores = [0,5]
    }else if((decisions[0]=='trahir'&&decisions[1]=='cooperer')){
      scores=[5,0]
    }else{
      scores=[1,1]
    }
    return scores;
  }

  quitterPartie() {
    this.joueurCourant().hasLeaved=true;
    if(this.partieState().joueurs[0].hasLeaved&&this.partieState().joueurs[1].hasLeaved){
      this.router.navigate(['/acceuil'])
    }else {
      if (this.joueurCourant() == this.partieState().joueurs[0]) {
        this.joueurCourant.set(this.partieState().joueurs[1])
      } else {
        this.joueurCourant.set(this.partieState().joueurs[0])
      }
    }
  }
}
