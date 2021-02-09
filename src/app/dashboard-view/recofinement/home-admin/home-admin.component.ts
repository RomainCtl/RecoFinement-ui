import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CreateApplicationDtoRequest } from 'src/app/models/DtoRequest/add-media/create_app.model';
import { CreateBookDtoRequest } from 'src/app/models/DtoRequest/add-media/create_book.model';
import { CreateGameDtoRequest } from 'src/app/models/DtoRequest/add-media/create_game.model';
import { CreateMovieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_movie.model';
import { CreateSerieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_serie.model';
import { CreateTrackDtoRequest } from 'src/app/models/DtoRequest/add-media/create_track.model';

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
export class HomeAdminComponent implements OnInit {

  columnsToDisplayTrack: string[] = ['title', 'artist_name'];
  columnsToDisplayMovie: string[] = ['title', 'director'];
  columnsToDisplaySerie: string[] = ['title', 'writers'];
  columnsToDisplayBook: string[] = ['title', 'author'];
  columnsToDisplayGame: string[] = ['name', 'publishers'];
  columnsToDisplayApps: string[] = ['name', 'current_version'];


  dataSourceTrack = new MatTableDataSource<CreateTrackDtoRequest>([
    {
      title: 'test',
      artist_name: 'test artist',
      covert_art_url: 'https://cdn.wccftech.com/wp-content/uploads/2018/02/Google.jpg',
      genres: [1],
      recording_mbid: '34EFZF',
      release: 'Coucou',
      spotify_id: 54,
      track_mmi: 'JFIEJZ98F',
      year: 2020
    }
  ]);

  dataSourceMovie = new MatTableDataSource<CreateMovieDtoRequest>([]);
  dataSourceSerie = new MatTableDataSource<CreateSerieDtoRequest>([]);
  dataSourceGame = new MatTableDataSource<CreateGameDtoRequest>([]);
  dataSourceBook = new MatTableDataSource<CreateBookDtoRequest>([]);
  dataSourceApplication = new MatTableDataSource<CreateApplicationDtoRequest>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElementTrack: CreateTrackDtoRequest | null;
  expandedElementMovie: CreateMovieDtoRequest | null;
  expandedElementSerie: CreateSerieDtoRequest | null;
  expandedElementBook: CreateBookDtoRequest | null;
  expandedElementGame: CreateGameDtoRequest | null;
  expandedElementApplication: CreateApplicationDtoRequest | null;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSourceTrack.paginator = this.paginator;
  }

}
