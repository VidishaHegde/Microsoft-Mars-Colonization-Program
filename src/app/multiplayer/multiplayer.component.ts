import { Component, OnInit } from '@angular/core';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
  
})
export class MultiplayerComponent extends BoardComponent implements OnInit {

  constructor() {
  super(); }

  ngOnInit(): void {
  	this.newGame();
  }
  disable: false;
  
  
}
