import { Track } from './../../shared/track.model';
import { TrackResponseDto } from './../../shared/models/DtoResponse/track.model';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  constructor(private trackService: TrackService) { }

  trackResponse: TrackResponseDto;

  ngOnInit(): void {
    this.trackService.getTracks(1).then((result: TrackResponseDto) => {
      this.trackResponse = result;
    console.log(this.trackResponse.content[0]);

    });

  }

  get tracks(): Track {
    return this.trackResponse.content[11];
  }

}
