import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerdataService } from '../services/playerdata.service';


@Component({
  selector: 'app-playernames',
  templateUrl: './playernames.component.html',
  styleUrls: ['./playernames.component.scss']
})
export class PlayernamesComponent implements OnInit {
  @ViewChild('fform') namesFormDirective;
  namesForm: FormGroup;
  names;
  canGo:boolean=false;
  player1name: string;
  player2name: string;
  constructor(private fb: FormBuilder, private data: PlayerdataService) { this.createForm(); }

  ngOnInit(): void {
    this.data.currentPlayer1.subscribe(player1name => this.player1name = player1name);
    this.data.currentPlayer2.subscribe(player2name => this.player2name = player2name);
  }
  createForm() {
    this.namesForm = this.fb.group({
      player1: '',
      player2: ''
    });
  }

  onSubmit() {
    this.canGo=true;
    this.names = this.namesForm.value;
    this.player1name = this.names['player1'];
    this.player2name = this.names['player2'];
    this.data.changePlayers(this.player1name, this.player2name);
    this.namesForm.reset({
      player1: '',
      player2: ''
    });
    this.namesFormDirective.resetForm();

  }

}
