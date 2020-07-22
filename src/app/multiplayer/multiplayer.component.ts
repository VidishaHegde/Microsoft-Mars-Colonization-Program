import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { PlayerdataService } from '../services/playerdata.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']

})
export class MultiplayerComponent extends BoardComponent implements OnInit {

  constructor(private data: PlayerdataService) {
    super();
  }
  player1name;
  player2name;
  ngOnInit(): void {
    this.data.currentPlayer1.subscribe(player1name => this.player1name = player1name);
    this.data.currentPlayer2.subscribe(player2name => this.player2name = player2name);
    this.newGame();

  }
  disable: false;


}
