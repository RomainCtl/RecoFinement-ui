import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TrackService } from 'src/app/services/media/track.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  musics = [];
  totalMusic = 10000;
  configMusic: any;

  films = [];
  books = [];
  games = [];
  applications = [];

  showMusic: boolean = true;
  showFilm: boolean = false;
  showBook: boolean = false;
  showGame: boolean = false;
  showApplication: boolean = false;

  constructor(private trackService: TrackService, private router: Router, private authService: AuthService) { 
    this.getTracks(1);

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

  onFinish() {
    this.authService.setPreferences(true);
    this.router.navigate(['app/musics']);
  }

  pageChanged(event){
    this.configMusic.currentPage = event;
    this.getTracks(this.configMusic.currentPage)
  }

  getTracks(page: number) {
    this.trackService.getTracks(+page).then(response => {
      if(response.status === true) {
        this.musics = response.content;
      }
    })
    .then(()=> {
      this.configMusic = {
        itemsPerPage: 20,
        currentPage: page,
        totalItems: this.totalMusic
      };
    })
    .catch(
      // TODO get exception
    );
  }

  closeAllFrame() {
    this.showMusic = this.showFilm = this.showBook = this.showGame = this.showApplication = false;
  }
  
}
