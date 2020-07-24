import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { PlayerdataService } from '../services/playerdata.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']

})
export class MultiplayerComponent extends BoardComponent implements OnInit {
  
  constructor(public data: PlayerdataService) {
    super(data);
  }
  
  player1name;
  player2name;
  ngOnInit(): void {
    this.data.currentPlayer1.subscribe(player1name => this.player1name = player1name);
    this.data.currentPlayer2.subscribe(player2name => this.player2name = player2name);
    this.newGame();

  }
  disable: false;
  showhint:boolean=false;
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
    this.showhint=true;
    setTimeout(() => {
      this.showhint=false;
    }, 3000);
  }
  get playerMarker() {
    return this.playerTurn ? "X" : "O";
  }
  get opponenetPlayerMarker(){
    return !this.playerTurn ? "X": "O";
  }
  
  

}
