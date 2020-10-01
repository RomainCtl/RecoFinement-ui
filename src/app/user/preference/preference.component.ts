import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  // gestion contexte
  musics = [];
  films = [];
  books = [];
  games = [];
  applications = [];

  // gestion affichage
  showMusic: boolean = true;
  showFilm: boolean = false;
  showBook: boolean = false;
  showGame: boolean = false;
  showApplication: boolean = false;

  constructor() { 
    this.musics = [
      {
        title: 'test1',
        author: 'author 1',
        note: 4
      },
      {
        title: 'test2',
        author: 'author 1',
        note: 1
      },
      {
        title: 'test3',
        author: 'author 1',
        note: 0
      },
      {
        title: 'test4',
        author: 'author 1',
        note: 4
      },
      {
        title: 'test5',
        author: 'author 1',
        note: 5
      },
      {
        title: 'test6',
        author: 'author 1',
        note: 0
      },
      {
        title: 'test7',
        author: 'author 1',
        note: 3
      },
      {
        title: 'test8',
        author: 'author 1',
        note: 0
      },
      {
        title: 'test9',
        author: 'author 1',
        note: 0
      },
      {
        title: 'test10',
        author: 'author 1',
        note: 4
      },
      {
        title: 'test11',
        author: 'author 1',
        note: 4
      },
      {
        title: 'test12',
        author: 'author 1',
        note: 1
      },
      {
        title: 'test13',
        author: 'author 1',
        note: 3
      },
      {
        title: 'test14',
        author: 'author 1',
        note: 2
      },
      {
        title: 'test15',
        author: 'author 1',
        note: 5
      },
      {
        title: 'test16',
        author: 'author 1',
        note: 3
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
