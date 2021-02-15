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
  public loading : boolean = true;


  @Input()
  public className: string;

  @Input()
  public content: any[] = new Array<any>();

  @Input()
  public title: string;

  @Input()
  public type: string;

  @Input()
  public preferences: boolean;

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
      centerInsufficientSlides: this.content.length < 6 ? true : false,
      spaceBetween: 10,
      autoplay:false,
      allowTouchMove: false,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      preloadImages: false,
      observer:true,
      lazy: {
        preloaderClass: 'blur',
        loadPrevNext: true,
        loadOnTransitionStart: true,
        loadPrevNextAmount: 2,
        checkInView: true
      },
      loop: false
    })

    let ap = document.querySelector('.swiper-container');
    ap.addEventListener('load', () => {
      console.log('swiper loaded')
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
