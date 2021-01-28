import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  genres = [];

  constructor(
    private trackService: TrackService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.trackService.getGenres().then((genres) => {
      this.genres = genres.content.sort(this.compare);
    });
  }

  saveNewTrack(value: NgForm): void {
    value.value.year = +value.value.year;
    value.value.spotify_id = +value.value.spotify_id;
    value.value.recording_mbid = uuid.v4();

    if (value.value.title !== "" || value.value.genres.length !== 0) {
      this.trackService.postNewTrack(value.value).then((result) => {
        this.snackBar.open(result.message, 'Alright!', {duration: 5000});
      })
    }
  }

  compare(a, b): any {
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

}
