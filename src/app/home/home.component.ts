import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	if(window.screen.width<300) {
  		this.isMobile = true;
  		this.isSmall = false;
  		this.isLarge = false;
  	}
  	else if(window.screen.width>950){
  		this.isLarge = true;
  		this.isSmall = false;
  		this.isMobile = false;
  	}
  	else{
  		this.isSmall = true;
  		this.isLarge = false;
  		this.isMobile = false;
  	}
  }
  isLarge: boolean;
  isSmall: boolean;
  isMobile: boolean;



}
