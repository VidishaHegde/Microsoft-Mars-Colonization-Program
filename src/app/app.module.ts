import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SingleplayerComponent } from './singleplayer/singleplayer.component';

import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MultiplayerComponent,
    SingleplayerComponent,

    SquareComponent,
    BoardComponent,

    HomeComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    

  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
