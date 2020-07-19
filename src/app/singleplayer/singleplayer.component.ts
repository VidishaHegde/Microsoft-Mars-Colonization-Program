import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Square } from '../square/square';

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


  constructor() {
    super();

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
    this.player1name = "You"
    this.player2name = "Computer"
    this.level = 0;

  }
  huplayer = "X";
  aiplayer = "O";


  isMovesLeft(board): boolean {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return true;
      }
    }
    return false;
  }
  


  evaluate(board): number {

    for (let i = 0; i < 9; i += 3) {

      if (board[i] && board[i + 1] && board[i + 2] && board[i].player === board[i + 1].player && board[i].player === board[i + 2].player) {
        if (board[i].player === this.aiplayer) return 10;
        else if (board[i].player === this.huplayer) return -10;
      }


      if (board[i / 3] && board[i / 3 + 6] && board[i / 3 + 3] && board[i / 3].player === board[i / 3 + 3].player && board[i / 3].player === board[i / 3 + 6].player) {
        if (board[i / 3].player === this.aiplayer)
          return 10;
        else if (board[i / 3].player === this.huplayer) return -10;
      }
    }
    if (board[0] && board[4] && board[8] && board[0].player == board[4].player && board[0].player == board[8].player) {
      if (board[0].player === this.aiplayer) return 10;
      else if (board[0].player === this.huplayer) return -10;

    }
    if (board[2] && board[4] && board[6] && board[2].player == board[4].player && board[4].player == board[6].player) {
      if (board[2].player === this.aiplayer) return 10;
      else if (board[2].player === this.huplayer) return -10;

    }

    return 0;
  }
  setLevel(level){
    this.level = level;
    
  }

  minimax(board, depth, isMax): number {
    var score = this.evaluate(board);
    if (score === 10) return score;
    if (score === -10) return score;
    if (!this.isMovesLeft(board)) return 0;
    if(this.level<3){
      if(depth==this.level) return score;
    }
    
    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = { player: "O", win: false };
          var temp = this.minimax(board, depth + 1, !isMax);
          if (best < temp) {
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

  findBestMove(board): number {
    let bestVal = -1000;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = { player: "O", win: false };
        var moveVal = this.minimax(board, 0, false);
        board[i] = null;
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;

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

