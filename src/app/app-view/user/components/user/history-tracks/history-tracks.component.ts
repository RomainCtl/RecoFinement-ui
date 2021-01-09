import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { TrackHistoryResponseDto } from 'src/app/models/DtoResponse/musics/track-history.model';

@Component({
  selector: 'app-history-tracks',
  templateUrl: './history-tracks.component.html',
  styleUrls: ['./history-tracks.component.scss']
})
export class HistoryTracksComponent implements OnInit {

  constructor(
    private trackService: TrackService
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
