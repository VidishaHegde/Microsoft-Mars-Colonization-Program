import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.scss']
})
export class ScoreSheetComponent{
@Input() player1score: number;
@Input() player2score: number;
@Input() player1name: string;
@Input() player2name: string;

  constructor() { }
  

}
