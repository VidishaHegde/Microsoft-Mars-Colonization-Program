import { Component, OnInit } from '@angular/core';
import { Square } from "../square/square";
import {ScoreSheetComponent} from '../score-sheet/score-sheet.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  squares: Square[];
  playerTurn: boolean;
  winner: string;
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



  tie: boolean;
  public check: number = 0;

  showPlayer: boolean = false;
  lastXMove: number;
  lastYMove: number;
  player1name: string;
  player2name: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  undo(board, lastTurn) {
    board[lastTurn] = null;

  }
  
  newGame() {
    //* Resetting Game
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
    this.tie = false;
    this.check=0;
    this.playerXwins = 0;
    this.playerOwins = 0;
    this.player1name = "Player 1";
    this.player2name = "Player 2";

  }
  startAgain(){
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
    this.tie = false;
    this.check=0;

  }

  get playerMarker() {
    return this.playerTurn ? "X" : "O";
  }

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
        this.playerXwins += 1;
      } 
      else if (this.winner === "O") {
        this.playerOwins += 1;
      }
      this.isDraw = this.checkTie();
      if (this.checkTie()) {
      this.tie = true;

      }
      (async () => {
        if(this.tie || this.winner){
        await this.delay(2000);
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
    if (this.check==9) return true;
  }
  // makeBotMove(){

  // }

}





