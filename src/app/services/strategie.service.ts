import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrategieService {

  constructor() { }

  getAllStrategies() {
    return ["Strat 1", "Strat 2", "Strat 3"];
  }
}
