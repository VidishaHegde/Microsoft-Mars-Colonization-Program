import { Component, OnInit } from '@angular/core';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-singleplayer',
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.scss']
})
export class SingleplayerComponent extends BoardComponent implements OnInit{
  squares : any[];
  xIsNext : boolean;
  winner : string;
  huWinner:boolean;
  aiWinner:boolean;
  tie : boolean;

  constructor() {
    super();

   }

  ngOnInit(): void {
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.huWinner=false;
    this.aiWinner=false;
    this.xIsNext = true;
    this.tie = false;
    this.showPlayer=true;
    this.check=0;
  }
  huplayer = "x";
  aiplayer = "o";

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
      if(board[i]===board[i+1] && board[i]===board[i+2]){
        if(board[i]===this.aiplayer) return 10;
        else if(board[i]===this.huplayer) return -10;
      }
      if(board[i/3]===board[i/3+3] && board[i/3]===board[i/3+6]){
        if(board[i/3] === this.aiplayer) 
          return 10;
        else if(board[i/3]===this.huplayer) return -10;
      }
    }
      if(board[0]==board[4] && board[0]==board[8]){
        if(board[0] === this.aiplayer) return 10;
        else if(board[0]===this.huplayer) return -10;

      }
      if(board[2]==board[4] && board[4]==board[6]){
        if(board[2] === this.aiplayer) return 10;
        else if(board[2]===this.huplayer) return -10;

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
            board[i] = this.aiplayer;
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
            board[i] = this.huplayer;
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
            board[i] = this.aiplayer;
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
      this.squares.splice(idx,1,this.huplayer);
      //this.xIsNext = !this.xIsNext;
      let board = this.squares;
      let move = this.findBestMove(board);
      //console.log(move);
      //console.log(board);
      this.squares.splice(move,1,this.aiplayer);
      //console.log(this.squares);
      
    }

    this.winner = this.calculateWinner();
    if(this.winner=="x") this.huWinner=true;
    if(this.winner=="o") this.aiWinner=true;
    if(this.checkTie()){
      this.tie = true;

    }


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
