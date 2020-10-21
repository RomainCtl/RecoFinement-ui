import { Game } from './../../shared/models/DtoResponse/games/Game.model';
import { GameService } from 'src/app/services/media/game.service';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameResponseDto } from 'src/app/shared/models/DtoResponse/games/games.model';
import { PopupComponent } from '../musics/modals/popup/popup.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(
    private trackService: GameService,
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

  ngOnInit(): void {
    this.trackService.getPopularGames(1).then((result: GameResponseDto) => {
      this.gameResponse = result;
      if (result.number_of_elements !== 0) {
        this.noGames = false;
      }
      if(this.nextPage !== this.gameResponse.total_pages) {
        this.finished = false;
      }
    });

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

  get games(): GameResponseDto {
    return this.gameResponse;
  }

  private getGames(page?: number): void {
    this.trackService.getPopularGames(page).then((result: GameResponseDto) => {
      this.gameResponse.content = this.gameResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Game>(PopupComponent, {
      data: this.gameResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'bg-light'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

  }
}
