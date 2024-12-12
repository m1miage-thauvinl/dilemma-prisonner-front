import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  baseURL : string = "https://prisonners-dilemma-g1-6-9c636af5bfc2.herokuapp.com/api/parties";
  constructor(private httpClient : HttpClient) { }

  postPartieFinie() {
    this.httpClient.post(this.baseURL + "/finie", {});
  }

}
