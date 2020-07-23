import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Square } from '../square/square';
import { PlayerdataService } from '../services/playerdata.service';

@Component({
  selector: 'app-singleplayer',
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.scss']
})
export class SingleplayerComponent extends BoardComponent implements OnInit {
  //squares : any[];
  xIsNext: boolean;
  winner: string;
  tie: boolean;
  squares: Square[];
  playerTurn: boolean;
  isDraw: boolean;
  playerXwins: number;
  playerOwins: number;
  disable = false;
  active: boolean;
  possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  level:number;


  constructor(public data: PlayerdataService) {
    super(data);

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
    this.playerXwins=0;
    this.playerOwins=0;
    this.huWinner = false;
    this.aiWinner = false;
    this.xIsNext = true;
    this.tie = false;
    this.showPlayer = true;
    this.check = 0;
    this.huplayer = "X";
    this.aiplayer = "O";
    this.huplayername = "You"
    this.aiplayername = "Computer"
    this.level = 8;
    this.active = false;


  }
  huplayer = "X";
  aiplayer = "O";


  

  isActive(){
    //make some random move in the start!//depending on the level!!!
    var board = this.squares;
    let move = this.findBestMove(board);
    this.squares.splice(move, 1, { player: "O", win: false });

  }
  makeActive(){
    this.active = true;
  }
  


  
  setLevel(level){
    this.level = level;
    
  }

  

  

  checkGameOver(){
    this.winner = this.isWinner();
    if (this.winner === "X") {
        this.playerXwins += 1;
        this.huWinner = true;
      } 
      else if (this.winner === "O") {
        this.playerOwins += 1;
        this.aiWinner = true;
      }
      this.isDraw = this.checkTie();
      if (this.checkTie()) {
      this.tie = true;

      }
      (async () => {
        if(this.tie || this.winner){
        await this.delay(3000);
        this.startAgain();
        
      }

      })();

  }
  //overriding minimax algorithm to include levels in singleplayer component
  minimax(board, depth, isMax): number {
    var score = this.evaluate(board);
    if (score === 10) return score;
    if (score === -10) return score;
    if (!this.isMovesLeft(board)) return 0;
    if(this.level<5){
      if(depth>=this.level) return score;
    }
    
    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = { player: "O", win: false };
          var temp = this.minimax(board, depth + 1, !isMax);
          if (best <= temp) {
            best = temp;
          }
          board[i] = null;

        }
      }
      return best;
    }
    else {
      let best = 1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = { player: "X", win: false };
          var temp = this.minimax(board, depth + 1, !isMax);
          if (best > temp) {
            best = temp;
          }
          board[i] = null;

        }
      }
      return best;

    }

  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, { player: "X", win: false });
      //this.xIsNext = !this.xIsNext;
      let board = this.squares;
      let move = this.findBestMove(board);
      console.log(move);
      console.log(board);
      this.checkGameOver();
      (async () => {
        if(!this.tie && !this.winner){
        console.log("thinking..");
        await this.delay(500);
        console.log("stop");
        this.squares.splice(move, 1, { player: "O", win: false });
        this.checkGameOver();
        }

      })();


      console.log(this.squares);


    }
  }
}

