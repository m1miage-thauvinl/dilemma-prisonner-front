import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/tours";
  constructor(private httpService : HttpClient) { }

  getNbTourTotal() {
    return this.httpService.get(this.baseURL + "/nbTours");
  }
  getNumTourCourant() {
    return this.httpService.get(this.baseURL + "/numTourCourant");
  }

  postJouer(idJoueur: number, decision: string) : number {
   this.httpService.post<number>(this.baseURL + "/jouer", {idJoueur: idJoueur, decision: decision});
   return 0;
  }
}
