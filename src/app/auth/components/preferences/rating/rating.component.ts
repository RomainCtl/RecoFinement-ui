import { Component, Input, OnInit } from '@angular/core';
import { ClickEvent, RatingChangeEvent } from 'angular-star-rating';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() note: number;
  @Input() media: string;
  @Input() type: string;

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): void {
  }

  onClick = ($event: ClickEvent) => {
    this.ratingService.saveRating(+$event.rating, +this.media, this.type).then(() => {
      this.note = $event.rating;
    }).catch((err) => {
      console.log(err);
    });
  }
}
