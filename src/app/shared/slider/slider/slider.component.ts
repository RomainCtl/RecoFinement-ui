import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper/core'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit  {

  public musics: any = null;
  public mySwiper: Swiper = new Swiper('.swiper-container');

  constructor() { }

  ngOnInit(): void {  } 

}
