import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SingleplayerComponent } from './singleplayer/singleplayer.component';

import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';




@NgModule({
  declarations: [
    AppComponent,
    MultiplayerComponent,
    SingleplayerComponent,

    SquareComponent,
    BoardComponent,

    HomeComponent,
    HeaderComponent,
    ScoreSheetComponent

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    LayoutModule
    
    

  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
