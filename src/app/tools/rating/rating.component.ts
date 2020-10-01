import { Component, Input, OnInit } from '@angular/core';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() note: number;
  @Input() media: string;
  onRatingChangeResult: RatingChangeEvent;

  constructor() { 
  }

  ngOnInit(): void {
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.note = $event.rating;
    console.log("media : "+ this.media +" -> " + this.note)
    // TODO save rating 
  };


}
