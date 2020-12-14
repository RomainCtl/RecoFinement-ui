import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TrackService } from '../services/media/track.service';
import { TrackHistoryResponseDto } from '../shared/models/DtoResponse/musics/track-history.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private trackService: TrackService
  ) {  }

  trackResponse: TrackHistoryResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  apiResponse = false;
  noTracks = true;

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

  private getHistoryMusics(page ?: number): void {
    this.trackService.getHistoryTracks(page).then((result: TrackHistoryResponseDto) => {
      this.trackResponse.content = this.trackResponse.content.concat(result.content);
      // this.nextPage++;
    });
  }


  get authService(): AuthService {
    return this._auth;
  }


}
