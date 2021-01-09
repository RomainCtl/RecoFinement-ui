import { AuthService } from 'src/app/app-view/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackService } from '../services/media/track.service';
import { TrackHistoryResponseDto } from '../../models/DtoResponse/musics/track-history.model';
import { SliderHistoryComponent } from '../../shared-features/slider/slider-history/slider-history.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(SliderHistoryComponent) historySwiper: SliderHistoryComponent;

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

  get authService(): AuthService {
    return this._auth;
  }

  ngAfterViewInit() {
    this.trackService.getHistoryTracks(1).then((result: TrackHistoryResponseDto) => {
      this.historySwiper.history = result.content;
    });
  }

}
