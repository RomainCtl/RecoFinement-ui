import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

import Swiper, { SwiperOptions } from 'swiper/core'
import { getLocaleDirection } from '@angular/common';
import { Content } from 'src/app/models/DtoResponse/Content.model';

interface ContentHistory {
    last_played_date: string,
    track: Track[]
};

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
  public content: any[] | ContentHistory[] = [];

  @Input()
  public title: string;

  @Input()
  public type: string;

  @Input()
  public preferences: boolean = false;

  @Input()
  public history: boolean = false;

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
      direction: 'horizontal',
      centerInsufficientSlides: this.content.length < 6 ? true : false,
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
      loop: false,
      breakpoints: {
        1040: {
          slidesPerView: 6,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    })
  }

  openPreview(item: Track) {
    this.openPreviewEvent.emit(item);
  }

  openPopUp(item: Track) {
    this.clickSeeMoreEvent.emit(item);
  }

}
