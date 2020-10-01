import { Component, Input, OnInit } from '@angular/core';
import { RatingChangeEvent } from 'angular-star-rating';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() note: number;
  @Input() media: string;
  onRatingChangeResult: RatingChangeEvent;

  constructor(private ratingService: RatingService) { 
  }

  ngOnInit(): void {
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.note = $event.rating;
    this.ratingService.saveRating(+this.note, +this.media);
  };

}