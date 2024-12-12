import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/tours";
  constructor(private httpService : HttpClient) { }

  /*getNbTourTotal() {
    return this.httpService.get(this.baseURL + "/nbTours");
  }*/
  /*getNumTourCourant() {
    return this.httpService.get(this.baseURL + "/numTourCourant");
  }*/

  async postJouer(idJoueur: number, decision: string) : Promise<number> {
   return await firstValueFrom(this.httpService.post<number>(this.baseURL + "/play", {idJoueur: idJoueur, decision: decision}));
  }
}
export interface Tour {
  id : number,
  roundNumber : number,
  status : string
}
