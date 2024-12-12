import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/joueurs/players";
  constructor(private httpService : HttpClient) { }

  getScoreJoueur(idJoueur: number) {
    return this.httpService.get(this.baseURL + "/" + idJoueur + "/score");
  }
  postNewJoueur() : number {
    this.httpService.post<number>(this.baseURL + "/new", {});
    return 0;
  }
}
