import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/media/book.service';
import { MovieService } from 'src/app/services/media/movie.service';
import { TrackService } from 'src/app/services/media/track.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  musics = [];
  movies = [];
  series = [];
  books = [];
  games = [];
  applications = [];

  showMusic: boolean = true;
  showFilm: boolean = false;
  showBook: boolean = false;
  showGame: boolean = false;
  showApplication: boolean = false;

  constructor(private trackService: TrackService, 
              private movieService: MovieService,
              private bookService: BookService,
              private router: Router, 
              private authService: AuthService) { 
    
    // Get popular tracks
    this.trackService.getPopularTracks().then(response => {
      if(response.status === true) {
        this.musics = response.content;
      }
    })
    .catch(
        err => console.error(err)
    );

    // Get popular movies
    this.movieService.getPopularMovies().then(response => {
      if(response.status === true) {
        this.movies = response.content;
      }
    })
    .catch(
        err => console.error(err)
    );

     // Get popular books
     this.bookService.getPopularBooks().then(response => {
      if(response.status === true) {
        this.books = response.content;
      }
    })
    .catch(
        err => console.error(err)
    );

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

  onFinish() {
    this.authService.setPreferences(true);
    this.router.navigate(['app/musics']);
  }

  closeAllFrame() {
    this.showMusic = this.showFilm = this.showBook = this.showGame = this.showApplication = false;
  }
  
}
