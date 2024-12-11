import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  constructor() { }

  getNbTourTotal() {
    return 0;
  }
  getNumTourCourant() {
    return 0;
  }

  postJouer(idJoueur: number, decision: string) : number {
    return 0;
  }
}
