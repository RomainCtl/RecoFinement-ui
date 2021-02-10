import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateSerieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_serie.model';
import { Application } from 'src/app/models/DtoResponse/applications/application.model';
import { Book } from 'src/app/models/DtoResponse/books/Book.model';
import { Game } from 'src/app/models/DtoResponse/games/Game.model';
import { Movie } from 'src/app/models/DtoResponse/movies/Movie.model';
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
  dataSourceMovie = new MatTableDataSource<Movie>([]);
  dataSourceSerie = new MatTableDataSource<CreateSerieDtoRequest>([]);
  dataSourceGame = new MatTableDataSource<Game>([]);
  dataSourceBook = new MatTableDataSource<Book>([]);
  dataSourceApplication = new MatTableDataSource<Application>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElementTrack: Track | null;
  expandedElementMovie: Movie | null;
  expandedElementSerie: CreateSerieDtoRequest | null;
  expandedElementBook: Book | null;
  expandedElementGame: Game | null;
  expandedElementApplication: Application | null;

  constructor(
    public snackBar: MatSnackBar,
    private trackService: TrackService,
  ) {
    this.getTrackToValidate();
  }

  getTrackToValidate(): void {
    this.trackService.getTrackToValidate().then((track: TrackResponseDto) => {
      this.dataSourceTrack = new MatTableDataSource<Track>(track.content);
      this.dataSourceTrack.paginator = this.paginator;
    });
  }

  acceptTrack(trackid: number): void {
    this.trackService.acceptTrackToAdd(trackid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getTrackToValidate();
    });
  }

  refuseTrack(trackid: number): void {
    this.trackService.refuseTrackToAdd(trackid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getTrackToValidate();
    });
  }
}
