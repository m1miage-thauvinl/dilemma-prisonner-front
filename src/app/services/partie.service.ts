import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/parties";

  constructor(private httpClient : HttpClient) { }
  async postNewJoueur(nomJoueur: string, nbTours: number) : Promise<Partie> {
    return await firstValueFrom(this.httpClient.post<Partie>(this.baseURL + "/create", {nomJoueur1 : nomJoueur, nbTours : nbTours}));
  }
}
export interface Partie {
  id : number,
  joueur1Id : number,
  joueur2Id : number,
  nbTours : number,
  status : string
}
