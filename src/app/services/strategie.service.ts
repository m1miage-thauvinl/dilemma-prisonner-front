import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrategieService {

  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/strategies";
  constructor(private httpService : HttpClient) { }

  getAllStrategies(): string[] {
    return ["Toujours coopérer", "Toujours trahir", "Donnant-donnant", "Aléatoire", "Pavlov"];
  }
}
