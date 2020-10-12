import { TrackResponseDto } from './../../shared/models/DtoResponse/track.model';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  constructor(private trackService: TrackService, private snackBar: MatSnackBar) { }

  trackResponse: TrackResponseDto;

  nextPage = 2;
  finished = false;

  ngOnInit(): void {
    this.trackService.getTracks(1).then((result: TrackResponseDto) => {
      this.trackResponse = result;
    });
  }

  onScroll(): void {
    console.log('scrolled');
    if (this.nextPage <= 3) {
      this.getMusics(this.nextPage);
    } else {
      this.snackBar.open('You have reached the end of the Internet!', 'Alright!');
      this.finished = true;
    }
  }

  get tracks(): TrackResponseDto {
    return this.trackResponse;
  }

  private getMusics(page?: number): void {
    this.trackService.getTracks(page).then((result: TrackResponseDto) => {
      this.trackResponse.content = this.trackResponse.content.concat(result.content);
      this.nextPage++;
      console.log(this.trackResponse.content);
    });
  }

}
