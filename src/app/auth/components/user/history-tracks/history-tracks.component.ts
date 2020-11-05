import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TrackService } from 'src/app/services/media/track.service';
import { TrackHistoryResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-history.model';

@Component({
  selector: 'app-history-tracks',
  templateUrl: './history-tracks.component.html',
  styleUrls: ['./history-tracks.component.scss']
})
export class HistoryTracksComponent implements OnInit {

  constructor(
    private trackService: TrackService,
    private mainSnackBar: MatSnackBar,
  ) { }

  nextPage = 2;
  finished = true;
  noTracks = true;
  apiResponse = false;

  trackResponse: TrackHistoryResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'start',
    duration: 5000
  };

  ngOnInit(): void {
    this.trackService.getHistoryTracks(1).then((result: TrackHistoryResponseDto) => {
      this.trackResponse = result;
      this.apiResponse = true;
      if (result.number_of_elements !== 0) {
        this.noTracks = false;
      }
    });
  }

  get tracksHistory(): TrackHistoryResponseDto {
    return this.trackResponse;
  }

  onScroll(): void {
    if (this.nextPage <= this.trackResponse.total_pages) {
      this.getHistoryMusics(this.nextPage);
    } else {
      if (!this.noTracks) {
        this.mainSnackBar.open('You have reached the end of your history!', 'Alright!', this.snackBarConfig);
      }
      this.finished = true;
    }
  }

  private getHistoryMusics(page ?: number): void {
    this.trackService.getHistoryTracks(page).then((result: TrackHistoryResponseDto) => {
      this.trackResponse.content = this.trackResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

}
