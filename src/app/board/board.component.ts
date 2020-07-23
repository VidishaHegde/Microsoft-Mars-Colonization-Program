import { Component, OnInit } from '@angular/core';
import { Square } from "../square/square";
import {ScoreSheetComponent} from '../score-sheet/score-sheet.component';
import { PlayerdataService } from '../services/playerdata.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  squares: Square[];
  playerTurn: boolean;
  winner: string;
  winnerName: string;
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


  player1name;
  player2name;
  tie: boolean;
  huWinner: boolean;
  aiWinner: boolean;
  public check: number = 0;
  hint = "";

  showPlayer: boolean = false;
  lastXMove: number;
  lastYMove: number;
  huplayername: string;
  aiplayername: string;
  huplayer = "X";
  aiplayer = "O";
  constructor(public data: PlayerdataService) { }

  ngOnInit(): void {
    this.data.currentPlayer1.subscribe(player1name => this.player1name = player1name);
    this.data.currentPlayer2.subscribe(player2name => this.player2name = player2name);
    this.newGame();
  }

  undo(board, lastTurn) {
    board[lastTurn] = null;

  }
  findBestMove(board): number {
    let bestVal = -1000;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = { player: this.playerMarker, win: false };
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
  evaluate(board): number {

    for (let i = 0; i < 9; i += 3) {

      if (board[i] && board[i + 1] && board[i + 2] && board[i].player === board[i + 1].player && board[i].player === board[i + 2].player) {
        if (board[i].player === this.playerMarker) return 10;
        else if (board[i].player === this.opponenetPlayerMarker) return -10;
      }


      if (board[i / 3] && board[i / 3 + 6] && board[i / 3 + 3] && board[i / 3].player === board[i / 3 + 3].player && board[i / 3].player === board[i / 3 + 6].player) {
        if (board[i / 3].player === this.playerMarker)
          return 10;
        else if (board[i / 3].player === this.opponenetPlayerMarker) return -10;
      }
    }
    if (board[0] && board[4] && board[8] && board[0].player == board[4].player && board[0].player == board[8].player) {
      if (board[0].player === this.playerMarker) return 10;
      else if (board[0].player === this.opponenetPlayerMarker) return -10;

    }
    if (board[2] && board[4] && board[6] && board[2].player == board[4].player && board[4].player == board[6].player) {
      if (board[2].player === this.playerMarker) return 10;
      else if (board[2].player === this.opponenetPlayerMarker) return -10;

    }

    return 0;
  }
  isMovesLeft(board): boolean {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return true;
      }
    }
    return false;
  }
  minimax(board, depth, isMax): number {
    var score = this.evaluate(board);
    if (score === 10) return score;
    if (score === -10) return score;
    if (!this.isMovesLeft(board)) return 0;
    // if(this.level<5){
    //   if(depth>=this.level) return score;
    // }
    
    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = { player: this.playerMarker, win: false };
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
          board[i] = { player: this.opponenetPlayerMarker, win: false };
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
  newGame() {
    //* Resetting Game
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.winnerName=null;
    this.isDraw = false;
    this.disable = false;
    this.tie = false;
    this.check=0;
    this.playerXwins = 0;
    this.playerOwins = 0;

    this.huplayername = this.player1name;
    this.aiplayername = this.player2name;
    this.hint = "";

  }
  startAgain(){
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
    this.tie = false;
    this.check=0;
    this.huWinner = false;
    this.aiWinner = false;

  }

  

  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  valueAtSquare(square: Square): string {
    //* Returns playerMarker at specified square
    return square && square.player;
  }
  checkGameOver(){
    this.winner = this.isWinner();
    if (this.winner === "X") {
      this.winnerName=this.huplayername;
        this.playerXwins += 1;
      } 
      else if (this.winner === "O") {
        this.winnerName=this.aiplayername;
        this.playerOwins += 1;
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

  isWinner(): string {
    //* Iterates through all possible win combinations
    for (let i = 0; i < this.possibleWins.length; i++) {
      //* Selecting the three index combination
      const [a, b, c] = this.possibleWins[i];
      if (
        //* Checking if all three squares have same playerMarker
        this.squares[a] &&
        this.squares[a].player === this.valueAtSquare(this.squares[b]) &&
        this.squares[a].player === this.valueAtSquare(this.squares[c])
      ) {
        //* Player has Won
        this.disable = true;
        this.squares[a] = { ...this.squares[a], win: true };
        this.squares[b] = { ...this.squares[b], win: true };
        this.squares[c] = { ...this.squares[c], win: true };

        return this.squares[a].player;
      }
    }
    //* No Player has Won
    return null;
  }

  checkTie() {
    this.check = this.check + 1;
    if (
      this.winner === null &&
      //* Checks whether all squares are filled
      this.squares.every(square => {
        return (
          this.valueAtSquare(square) === "X" ||
          this.valueAtSquare(square) === "O"
        );
      })
    ) {
      return true;
    }
    if (this.check==18) return true;
  }
  // makeBotMove(){

  // }
  get playerMarker() {
    return "O";
  }
  get opponenetPlayerMarker(){
    return "X";
  }

}





