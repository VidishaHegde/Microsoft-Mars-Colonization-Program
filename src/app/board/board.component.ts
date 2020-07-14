import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	squares : any[];
	xIsNext : boolean;
	winner : string;
  tie : boolean;



  constructor() { }

  ngOnInit(): void {
  	this.newGame();
  }
  newGame(){
  	this.squares = Array(9).fill(null);
  	this.winner = null;
  	this.xIsNext = true;
    this.tie = false;
  
  
  }

  get player(){
  	return this.xIsNext ? 'X' : 'O';
  }
  checkTie() {
    if (
      this.winner === null &&
      //* Checks whether all squares are filled
      this.squares.every(square => {
        return (
          square == "X" ||
          square == "O"
        );
      })
    ) {
      return true;
    }
  }
  calculateWinner(){
    const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];

    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];

      if(
        this.squares[a] && 
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ){
        return this.squares[a];
      }
    }
    return null;
  }


    
  makeMove(idx: number){
  	if(!this.squares[idx]){
  		this.squares.splice(idx,1,this.player);
  		this.xIsNext = !this.xIsNext;
  		
  	}
  	this.winner = this.calculateWinner();
    if(this.checkTie()){
      this.tie = true;

    }
  }
}

    
  

  
