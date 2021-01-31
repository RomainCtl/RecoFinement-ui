import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

import Swiper, { SwiperOptions } from 'swiper/core'
import { getLocaleDirection } from '@angular/common';
import { Content } from 'src/app/models/DtoResponse/Content.model';

@Component({
  selector: '[app-slider]',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit  {


  public mySwiper: Swiper;
  public loadedImages = []


  @Input()
  public className: string;

  @Input()
  public content: any[];

  @Input()
  public title: string;

  @Output()
  public openPreviewEvent: EventEmitter<Track> = new EventEmitter<Track>();

  @Output()
  public clickSeeMoreEvent: EventEmitter<Track> = new EventEmitter<Track>();

  @Output()
  public endReachedEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public deactivateSearchEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.mySwiper = new Swiper('.' + this.className, {
      direction: this.getDirection(),
      slidesPerView: 6,
      spaceBetween: 10,
      autoplay:false,
      keyboard: true,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      preloadImages: false,
      lazy: {
        preloaderClass: 'blur',
        loadPrevNext: true,
        loadOnTransitionStart: true,
        loadPrevNextAmount: 2,
        checkInView: true
      },
      loop: true,
      preventClicks: true,
      passiveListeners: true
    })
  }

  openPreview(item: Track) {
    this.openPreviewEvent.emit(item);
  }

  imageLoaded(index) {
    this.loadedImages.push(index)
    console.log(this.loadedImages)
  }

  getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }

  openPopUp(item: Track) {
    this.clickSeeMoreEvent.emit(item);
  }

  loadMoreSlides(index: number) {
    this.endReachedEvent.emit(this.content.length/24 + 1)
    this.mySwiper.init();
  }

  deactivateSearch() {
    this.deactivateSearchEvent.emit();
  }

}
