import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SingleplayerComponent } from './singleplayer/singleplayer.component';
import { PlayerdataService } from './services/playerdata.service';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { PlayernamesComponent } from './playernames/playernames.component';




@NgModule({
  declarations: [
    AppComponent,
    MultiplayerComponent,
    SingleplayerComponent,

    SquareComponent,
    BoardComponent,

    HomeComponent,
    HeaderComponent,
    ScoreSheetComponent,
    PlayernamesComponent

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule
    
    

  ],
  providers: [AppRoutingModule,PlayerdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
