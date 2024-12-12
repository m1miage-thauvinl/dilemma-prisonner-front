import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/joueurs/player";
  constructor(private httpService : HttpClient) { }

  async getNbJoueurs() : Promise<number> {
    return (await firstValueFrom(this.httpService.get<Object[]>(this.baseURL + "/all"))).length;
  }
  async getScoreJoueur(idJoueur: number) : Promise<number> {
    return await firstValueFrom(this.httpService.get<number>(this.baseURL + "/" + idJoueur + "/score"));
  }
  async postPartieFinie(idJoueur : number, strategies : string) : Promise<boolean>{
    return await firstValueFrom(this.httpService.post<boolean>(this.baseURL + "/leave", {}));
  }
}
