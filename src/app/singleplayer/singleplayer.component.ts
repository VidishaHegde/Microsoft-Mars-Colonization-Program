import { Component, OnInit } from '@angular/core';
import {BoardComponent} from '../board/board.component';
import {Square} from '../square/square';

@Component({
  selector: 'app-singleplayer',
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.scss']
}) 
export class SingleplayerComponent extends BoardComponent implements OnInit{
  //squares : any[];
  xIsNext : boolean;
  //winner : string;
  tie : boolean;
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


  constructor() {
    super();
    //this.newGame();
   }

  ngOnInit(): void {
    console.log("started");
    this.newGame();

  }
  newGame(){
   this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
  
  
  }
  huplayer = "X";
  aiplayer = "O";


  isMovesLeft(board): boolean{
    for(let i=0;i<board.length;i++){
      if(board[i]===null){
        return true;
      }
    }
    return false;
  }


  evaluate(board): number{

    for(let i=0;i<9;i+= 3){
     
      if(board[i] && board[i+1] && board[i+2] && board[i].player===board[i+1].player && board[i].player===board[i+2].player){
        if(board[i].player===this.aiplayer) return 10;
        else if(board[i].player===this.huplayer) return -10;
      }
    

      if(board[i/3] && board[i/3+6] && board[i/3+3] && board[i/3].player===board[i/3+3].player && board[i/3].player===board[i/3+6].player){
        if(board[i/3].player === this.aiplayer) 
          return 10;
        else if(board[i/3].player===this.huplayer) return -10;
      }
    }
      if(board[0] && board[4] && board[8]&& board[0].player==board[4].player && board[0].player==board[8].player){
        if(board[0].player === this.aiplayer) return 10;
        else if(board[0].player===this.huplayer) return -10;

      }
      if(board[2] && board[4] && board[6]&& board[2].player==board[4].player && board[4].player==board[6].player){
        if(board[2].player === this.aiplayer) return 10;
        else if(board[2].player===this.huplayer) return -10;

      }

      return 0;
    }

    minimax(board,depth, isMax) : number{
      var score = this.evaluate(board);
      if(score === 10) return score;
      if(score === -10) return score;
      if(!this.isMovesLeft(board)) return 0;
      if(isMax){
        let best = -1000;
        for(let i=0;i<9;i++){
          if(board[i]===null){
            board[i]= {player:"O", win: false};
            var temp = this.minimax(board, depth+1, !isMax);
            if(best<temp){
              best = temp;
            }
            board[i] = null;
            
          }
        }
        return best;
      }
      else{
        let best = 1000;
        for(let i=0;i<9;i++){
          if(board[i]===null){
            board[i] = {player:"X", win: false};
            var temp = this.minimax(board, depth+1, !isMax);
            if(best>temp){
              best = temp;
            }
            board[i] = null;
            
          }
        }
        return best;

      }

    }

    findBestMove(board) : number{
      let bestVal = -1000;
      let bestMove = -1;
      for(let i=0;i<9;i++){
          if(board[i]===null){
            board[i] = {player:"O", win: false};
            var moveVal = this.minimax(board, 0, false);
            board[i] = null;
            if(moveVal>bestVal){
              bestMove = i;
              bestVal = moveVal;
            }
          }
        }
       return bestMove;
            
    }

    makeMove(idx: number){
    if(!this.squares[idx]){
      this.squares.splice(idx,1,{player: "X", win: false });
      //this.xIsNext = !this.xIsNext;
      let board = this.squares;
      let move = this.findBestMove(board);
      console.log(move);
      console.log(board);
      this.winner = this.isWinner();
    if (this.winner === "X") {
      this.playerXwins += 1;
    } else if (this.winner === "O") {
      this.playerOwins += 1;
    }
    //* Check for Tie
    this.isDraw = this.checkTie();
      this.squares.splice(move,1,{player: "O", win: false });
      console.log(this.squares);

      
    }
    this.winner = this.isWinner();
    if (this.winner === "X") {
      this.playerXwins += 1;
    } else if (this.winner === "O") {
      this.playerOwins += 1;
    }
    //* Check for Tie
    this.isDraw = this.checkTie();
  }

  


  

//   makeMove (idx: number) {

//        if(!this.squares[idx]){
//   		this.squares.splice(idx,1,this.player);
//   		this.xIsNext = !this.xIsNext;
  	
//   		makeMove(squares);
//   		// }
//   	}
//   	this.winner = this.calculateWinner();
//     };
    
//    findMove(board) {
//         var bestMoveValue = -100 ;
//         var move = 0;
//         for (var i = 0; i < board.length; i++) {
//             var newBoard = this.makeMove(i,this.player , board);
//             if (newBoard) {
//                 var predictedMoveValue = this.minValue(newBoard);
//                 if (predictedMoveValue > bestMoveValue) {
//                     bestMoveValue = predictedMoveValue;
//                     move = i;
//                 }
//             }
//         }
//         return move;
//     };

//     minValue(board) {
//         var winner = GameUtil.checkForWinner(board);
//         if (winner == this.aiPlayerLabel )  {
//             return 1;
//       } else if (winner == this.humanPlayerLabel) {
//             return -1;
//         } else if (this.checkTie(board)) {
//             return 0;
//         } else {
//             var bestMoveValue = 100;
//             var move = 0;
//             for (var i = 0; i < board.length; i++) {
//                 var newBoard = this.makeMove(i, this.humanPlayerLabel, board);
//                 if (newBoard) {
//                     var predictedMoveValue = this.maxValue(newBoard);
//                     if (predictedMoveValue < bestMoveValue) {
//                         bestMoveValue = predictedMoveValue;
//                         move = i;
//                     }
//                 }
//             }
//             return bestMoveValue;
//         }
//     };

//     maxValue(board) {
//         var winner = GameUtil.checkForWinner(board);
//         if (winner == this.aiPlayerLabel )  {
//             return 1;
//         } else if (winner == this.humanPlayerLabel) {
//             return -1;
//         } else if (this.checkTie(board)) {
//             return 0;
//         } else {
//             var bestMoveValue = -100;
//             var move = 0;
//             for (var i = 0; i < board.length; i++) {
//                 var newBoard = this.makeMove(i, this.aiPlayerLabel, board);
//                 if (newBoard) {
//                     var predictedMoveValue = this.minValue(newBoard);
//                     if (predictedMoveValue > bestMoveValue) {
//                         bestMoveValue = predictedMoveValue;
//                         move = i;
//                     }
//                 }
//             }
//             return bestMoveValue;
//         }
//     };

}
