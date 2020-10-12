import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-card-preference',
  templateUrl: './card-preference.component.html',
  styleUrls: ['./card-preference.component.scss']
})
export class CardPreferenceComponent implements OnInit {

  @Input() id: number;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() rating: number;
  @Input() cover: string;
  @Input() type: string;
  @Input() info: string;

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line:typedef only-arrow-functions
    $(document).ready(function() {
      let maxHeightHeader = 0;
      let maxHeightImg = 0;
      let maxHeightInfo = 0;

      // tslint:disable-next-line:typedef
      $('mat-card-header').each(function(){
         if ($(this).height() > maxHeightHeader) { maxHeightHeader = $(this).height(); }
      });
      $('mat-card-header').height(maxHeightHeader);

      // tslint:disable-next-line:typedef
      $('.card-img').each(function(){
        if ($(this).height() > maxHeightImg) { maxHeightImg = $(this).height(); }
      });
      $('.card-img').height(maxHeightImg);

      // tslint:disable-next-line:typedef
      $('mat-card-content').each(function(){
        if ($(this).height() > maxHeightInfo) { maxHeightInfo = $(this).height(); }
      });
      $('mat-card-content').height(maxHeightInfo);
    });
  }

}
