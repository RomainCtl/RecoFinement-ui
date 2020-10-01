import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/media/track.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  musics = [];
  films = [];
  books = [];
  games = [];
  applications = [];

  showMusic: boolean = true;
  showFilm: boolean = false;
  showBook: boolean = false;
  showGame: boolean = false;
  showApplication: boolean = false;

  constructor(private trackService: TrackService) { 
    this.trackService.getTracks().then(response => {
      this.musics = response;
    });

    this.films = [
      {
        movie_id: 1,
        title: 'movie 1',
        director: 'director 1',
        rating: 0
      }
    ];
    this.books = [
      {
        isbn: 1,
        title: 'book 1',
        author: 'author 1',
        rating: 0,
        image_url_s: 'https://th.bing.com/th/id/OIP.Pnhv1abLs10qfQt_9KVIqQHaLN?pid=Api&rs=1'

      }
    ];
    this.games = [
      {
        id: 1,
        name: 'Game 1',
        publishers: 'publisher 1',
        rating: 0,
      }
    ];
    this.applications = [
      {
        app_id: 1,
        name: "App1",
        rating: 0
      }
    ];
  }

  ngOnInit(): void {
  }

  onChange(id: string) {
    this.closeAllFrame();
    switch(id) {
      case 'music':
        this.showMusic = true;
        break;
      case 'film':
        this.showFilm = true;
        break;
      case 'book':
        this.showBook = true;
        break;
      case 'game':
        this.showGame = true;
        break;
      case 'application':
        this.showApplication = true;
        break;

    }
  }

  closeAllFrame() {
    this.showMusic = this.showFilm = this.showBook = this.showGame = this.showApplication = false;
  }
  
}
