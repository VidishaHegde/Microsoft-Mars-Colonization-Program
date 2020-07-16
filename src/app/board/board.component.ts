import { Component, OnInit } from '@angular/core';
import { Square } from "../square/square";

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
 


  tie : boolean;
  public check: number = 0;
	
	showPlayer: boolean = false;




	constructor() { }

	ngOnInit(): void {
		this.newGame();
	}

	
   
  
  
  

 //  get player(){
 //  	return this.xIsNext ? 'X' : 'O';
 //  }
 //  checkTie() {
 //    if (
 //      this.winner === null &&
 //      //* Checks whether all squares are filled
 //      this.squares.every(square => {
 //        return (
 //          square.player == "X" ||
 //          square.player == "O"
 //        );
 //      })
 //    ) {
 //      return true;
 //    }
 //  }
 //  calculateWinner(){
 //    const lines = [
 //    [0,1,2],
 //    [3,4,5],
 //    [6,7,8],
 //    [0,3,6],
 //    [1,4,7],
 //    [2,5,8],
 //    [0,4,8],
 //    [2,4,6]
 //    ];

 //    for(let i=0;i<lines.length;i++){
 //      const [a,b,c] = lines[i];

 //      if(
 //        this.squares[a] && 
 //        this.squares[a].player === this.squares[b].player &&
 //        this.squares[a].player === this.squares[c].player
 //      ){
 //        return this.squares[a].player;
 //      }
 //    }
 //    return null;
 //  }


    
 //  makeMove(idx: number){
 //  	if(!this.squares[idx]){
 //  		this.squares.splice(idx,1,{player: this.player, win:false});
 //  		this.xIsNext = !this.xIsNext;
  		
 //  	}
 //  	this.winner = this.calculateWinner();
 //    if(this.checkTie()){
 //      this.tie = true;

 //    }
 //  }

newGame() {
    //* Resetting Game
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
    this.tie = false;
  }

  get playerMarker() {
    return this.playerTurn ? "X" : "O";
  }

  makeMove(index: number) {
    //* Checks whether square is empty
    if (this.squares[index] === null) {
      //* Replaces empty square with playerMarker
      this.squares.splice(index, 1, { player: this.playerMarker, win: false });
      //* Switches turn
      this.playerTurn = !this.playerTurn;
    }
    //* Check for Winner
    this.winner = this.isWinner();
    if (this.winner === "X") {
      this.playerXwins += 1;
    } else if (this.winner === "O") {
      this.playerOwins += 1;
    }
    //* Check for Tie
    this.isDraw = this.checkTie();
    // this.scoreService.publish(
    //   new ScoreSheet(this.playerXwins, this.playerOwins)
    // );
  }

  valueAtSquare(square: Square): string {
    //* Returns playerMarker at specified square
    return square && square.player;
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
    this.check=this.check+1;
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
    if(this.check==5) return true;
  }
	// makeBotMove(){

	// }

}

    
  

  
