import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

enum MusicReasons {
  ARTIST = "I don't like the artist",
  ALBUM = "I don't like the album",
  YEAR = "I don't like musics from that year",
  GENRE = "I don't like this genre"
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  selected: string = 'Reason';
  reasons = Object.values(MusicReasons)

  constructor(
    @Inject(MAT_DIALOG_DATA) public trackId,
    private trackService: TrackService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  sendFeedback() {
    setTimeout(() => {
      this.dialog.openDialogs[0].close();
      this.trackService.badRecommendation(this.trackId, {});
      this.snackBar.open('Thank you for your feedback!', null, { horizontalPosition: 'end'});
    }, Math.random()*1000);
  }

}
