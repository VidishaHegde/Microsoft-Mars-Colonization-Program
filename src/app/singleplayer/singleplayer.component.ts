import { Component, OnInit } from '@angular/core';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-singleplayer',
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.scss']
})
export class SingleplayerComponent  extends BoardComponent implements OnInit{
  
  constructor() {
  super();
   }

  ngOnInit(): void {

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
