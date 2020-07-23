import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerdataService {
  private player1nameSource = new BehaviorSubject('Player 1');
  currentPlayer1 = this.player1nameSource.asObservable();
  private player2nameSource = new BehaviorSubject('Player 2');
  currentPlayer2 = this.player2nameSource.asObservable();
  constructor() { }
  changePlayers(player1: string,player2: string) {
    this.player1nameSource.next(player1);
    this.player2nameSource.next(player2);
    
    
  }
}
