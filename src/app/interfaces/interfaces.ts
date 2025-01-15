export interface Joueur {id : string; strategy : string; score : number; hasLeaved : boolean}

export interface Partie {
  nbTours : number;
  joueurs: Joueur[];
  isActive : boolean
}
