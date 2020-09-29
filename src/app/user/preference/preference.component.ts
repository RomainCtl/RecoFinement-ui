import { Component, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/services/user/preference.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  // gestion contexte
  preferences: string[];
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


  constructor(private preferencesService: PreferenceService) { 
    this.preferences = this.preferencesService.getPreferences();
    this.musics = [
      {
        title: 'test1',
        author: 'author 1'
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
  
  onSave() {
    this.preferencesService.savePreferences().then(
      //TODO redirection
    )
  }
}
