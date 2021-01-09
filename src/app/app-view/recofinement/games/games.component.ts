import { Game } from '../../../models/DtoResponse/games/Game.model';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private mainSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay) { }


  gameResponse: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  nextPage = 2;
  finished = true;
  noGames = true;
  apiResponse = false;

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  appCtrl = new FormControl();
  filteredGames: Observable <Game[]>;

  ngOnInit(): void {
    this.gameService.getPopularGames(1).then((result: GameResponseDto) => {
      this.gameResponse = result;
      this.apiResponse = true;
      if (result.number_of_elements !== 0) {
        this.noGames = false;
      }
      if (this.nextPage !== this.gameResponse.total_pages) {
        this.finished = false;
      }
      this.filteredGames = this.appCtrl.valueChanges
      .pipe(
        startWith(''),
        map(game => game ? this._filter(game) : this.games.content.slice())
      );
    });
  }
  private _filter(value: string): Game[] {
    const filterValue = value.toLowerCase();
    return this.games.content.filter(game => game.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onScroll(): void {
    if (this.nextPage <= this.gameResponse.total_pages) {
      this.getGames(this.nextPage);
    } else {
      if (!this.noGames) {
        this.mainSnackBar.open('You have reached the end of the Internet!', 'Alright!');
      }
      this.finished = true;
    }
  }

  private getSearchedGames(searchTerm: string): void {
    this.gameService.searchGames(searchTerm).then((result: GameResponseDto) => {
      this.gameResponse.content = result.content;
      if (this.gameResponse.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
    });
  }

  get games(): GameResponseDto {
    return this.gameResponse;
  }

  private getGames(page?: number): void {
    this.gameService.getPopularGames(page).then((result: GameResponseDto) => {
      this.gameResponse.content = this.gameResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Game>(PopupComponent, {
      data: this.gameResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  searchGames(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.searchActivated = true;
      this.getSearchedGames(searchTerm);
    }

    if (searchTerm.length === 0) {
      this.gameService.getPopularGames(1).then((result: GameResponseDto) => {
        this.gameResponse = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.noGames = false;
        }
        if (this.nextPage !== this.gameResponse.total_pages) {
          this.finished = false;
        }
      });
    }
  }
}
