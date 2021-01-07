import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper/core';
import { TrackHistory } from '../../models/DtoResponse/musics/track-history-dto.model';

@Component({
  selector: '[app-slider-history]',
  templateUrl: './slider-history.component.html',
  styleUrls: ['./slider-history.component.scss']
})
export class SliderHistoryComponent implements OnInit {

  public history: TrackHistory[] = null;
  public historySwiper: Swiper;
  public loadedImages = [];

  ngOnInit(): void {
    this.historySwiper = new Swiper('.listening_history', {
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

  getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }

  imageLoaded(index) {
    this.loadedImages.push(index)
  }

}
