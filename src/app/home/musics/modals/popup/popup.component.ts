import { ClickEvent } from 'angular-star-rating';
import { RatingService } from './../../../../services/rating/rating.service';
import { PreviewComponent } from './../preview/preview.component';
import { MusicsComponent } from './../../musics.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Track } from './../../../../shared/track.model';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  track: Track[];
  indexOfElement: number;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public item: any, private ratingService: RatingService) { }

  @Input() rateNumber: number;
  readOnly = false;

  ngOnInit(): void {
  }

  saveRating(event: ClickEvent): void {
    this.item.rating_count++;
    this.readOnly = true;
    this.ratingService.saveRating(event.rating, this.item.track_id, 'music')
    .then((result) => {
      console.log(result);
    }).catch(() => {
    });
  }

}
