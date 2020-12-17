import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import Swiper from 'swiper/core'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit  {


  public musics: any = null;
  public mySwiper: Swiper;

  @Output()
  public openPreviewEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { } 

  ngOnInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      a11y: { enabled: true },
      direction: 'horizontal',
      slidesPerView: 8,
      autoHeight: true,
      spaceBetween: 50,
      keyboard: true,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      observer: true
    })
    this.mySwiper.on('scroll', () => {
      this.mySwiper.update()
    })
  }

  openPreview(index) {
    this.openPreviewEvent.emit(index);
  }

}
