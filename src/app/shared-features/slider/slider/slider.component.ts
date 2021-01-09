import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import Swiper from 'swiper/core'
import { getLocaleDirection } from '@angular/common';

@Component({
  selector: '[app-slider]',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit  {


  public musics: Track[] = null;
  public mySwiper: Swiper;
  public loadedImages = []

  @Output()
  public openPreviewEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public clickSeeMoreEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public openFeedbackEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.mySwiper = new Swiper('.popular_music', {
      direction: this.getDirection(),
      slidesPerView: 6,
      a11y: { enabled: true },
      watchSlidesVisibility: true,
      spaceBetween: 30,
      autoHeight: true,
      keyboard: true,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      observer: true,
      preloadImages: false,
      lazy: {
        preloaderClass: 'blur',
        loadPrevNext: true,
        loadOnTransitionStart: true,
        loadPrevNextAmount: 2,
        checkInView: true
      }
    })
  }

  openPreview(index) {
    this.openPreviewEvent.emit(index);
  }

  imageLoaded(index) {
    this.loadedImages.push(index)
    console.log(this.loadedImages)
  }

  getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }

  openPopUp(index: number) {
    this.clickSeeMoreEvent.emit(index);
  }

  openFeedback(index: number) {
    this.openFeedbackEvent.emit(index);
  }

}
