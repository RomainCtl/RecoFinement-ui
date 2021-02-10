import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateApplicationDtoRequest } from 'src/app/models/DtoRequest/add-media/create_app.model';
import { CreateBookDtoRequest } from 'src/app/models/DtoRequest/add-media/create_book.model';
import { CreateGameDtoRequest } from 'src/app/models/DtoRequest/add-media/create_game.model';
import { CreateMovieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_movie.model';
import { CreateSerieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_serie.model';
import { TrackResponseDto } from 'src/app/models/DtoResponse/musics/track-dto.model';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeAdminComponent {

  columnsToDisplayTrack: string[] = ['title', 'artist_name'];
  columnsToDisplayMovie: string[] = ['title', 'director'];
  columnsToDisplaySerie: string[] = ['title', 'writers'];
  columnsToDisplayBook: string[] = ['title', 'author'];
  columnsToDisplayGame: string[] = ['name', 'publishers'];
  columnsToDisplayApps: string[] = ['name', 'current_version'];

  dataSourceTrack = new MatTableDataSource<Track>([]);
  dataSourceMovie = new MatTableDataSource<CreateMovieDtoRequest>([]);
  dataSourceSerie = new MatTableDataSource<CreateSerieDtoRequest>([]);
  dataSourceGame = new MatTableDataSource<CreateGameDtoRequest>([]);
  dataSourceBook = new MatTableDataSource<CreateBookDtoRequest>([]);
  dataSourceApplication = new MatTableDataSource<CreateApplicationDtoRequest>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElementTrack: Track | null;
  expandedElementMovie: CreateMovieDtoRequest | null;
  expandedElementSerie: CreateSerieDtoRequest | null;
  expandedElementBook: CreateBookDtoRequest | null;
  expandedElementGame: CreateGameDtoRequest | null;
  expandedElementApplication: CreateApplicationDtoRequest | null;

  constructor(
    private trackService: TrackService,
  ) {
    this.getTrackToValidate();
  }

  getTrackToValidate(): void {
    this.trackService.getTrackToValidate().then((track: any) => {
      this.dataSourceTrack = new MatTableDataSource<Track>(track.content);
      this.dataSourceTrack.paginator = this.paginator;
    });
  }

  acceptTrack(trackid: number): void {
    this.trackService.acceptTrackToAdd(trackid).then((test: any) => {
      console.log(test);
      this.getTrackToValidate();
    });
  }

  refuseTrack(trackid: number): void {
    this.trackService.refuseTrackToAdd(trackid).then((test: any) => {
      console.log(test);
      this.getTrackToValidate();
    });
  }
}
