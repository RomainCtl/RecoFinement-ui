import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateTrackDtoRequest } from 'src/app/models/DtoRequest/add-media/create_track.model';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  genres = [];
  selectedGenres = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
    private trackService: TrackService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.item.spotify_id) {
      this.trackService.getGenres().then((genres) => {
        this.genres = genres.content.sort(this.compare);
        this.selectedGenres = this.genres;
      });
    }
  }

  onKey(value) {
    this.selectedGenres = this.search(value).sort(this.compare);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.genres.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  addTrack(values: CreateTrackDtoRequest): void {
    console.log(values);
    values.year = +values.year;
    values.spotify_id = +values.spotify_id;

    if (values.title !== undefined || values.genres.length !== 0) {
      this.trackService.postNewTrack(values).then((result) => {
        this.snackBar.open(result.message, 'Alright!', {duration: 5000});
      })
    } else {
      this.snackBar.open('Required fields are missing', '', {duration: 5000});
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
