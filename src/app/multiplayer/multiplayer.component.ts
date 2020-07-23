import { Component, OnInit } from '@angular/core';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
  
})
export class MultiplayerComponent extends BoardComponent implements OnInit {

  constructor() {
  super(); }

  ngOnInit(): void {
  	this.newGame();
  	
  }
  disable: false;
  hint: string;

  makeMove(index: number) {
    //* Checks whether square is empty
    if (this.squares[index] === null) {
      //* Replaces empty square with playerMarker
      this.squares.splice(index, 1, { player: this.playerMarker, win: false });
      if (this.playerMarker == "X") {
        this.lastXMove = index;
      }
      else {
        this.lastYMove = index;
      }
      //* Switches turn
      this.playerTurn = !this.playerTurn;
    }
    //* Check for Winner
    
    this.checkGameOver();
    
  }

  showHint(){
    var move = this.findBestMove(this.squares);
    var row = Math.floor(move/3);
    var column = move%3;
    console.log(this.playerMarker);
    console.log(this.opponenetPlayerMarker);
    this.hint = "Row:"+(row+1)+" Column: "+(column+1);

  }
  get playerMarker() {
    return this.playerTurn ? "X" : "O";
  }
  get opponenetPlayerMarker(){
    return !this.playerTurn ? "X": "O";
  }
  
  
}
