import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { Game } from '../../../models/DtoResponse/games/Game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(
    private gameService: GameService,
    public dialog: MatDialog,
    public overlay: Overlay) { }


  popularGames: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedGamesForUserFromProfile: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedGamesForUserFromSimilarContent: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedGamesFromGroupsFromProfile: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedGamesFromGroupsFromSimilarContent: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  ngOnInit(): void {
    this.gameService.getPopularGames(1).then((result: GameResponseDto) => {
      this.popularGames = result;
    });
    this.gameService.getRecommendedGamesForUser('FromProfile').then((result: GameResponseDto) => {
      this.recommendedGamesForUserFromProfile = result;
    });
    this.gameService.getRecommendedGamesForUser('FromSimilarContent').then((result: GameResponseDto) => {
      this.recommendedGamesForUserFromSimilarContent = result;
    });
    this.gameService.getRecommendedGamesFromGroups('FromProfile').then((result: GameResponseDto) => {
      this.recommendedGamesFromGroupsFromProfile = result;
    })
    this.gameService.getRecommendedGamesFromGroups('FromSimilarContent').then((result: GameResponseDto) => {
      this.recommendedGamesFromGroupsFromSimilarContent = result;
    })
  }

  openPopUp(game: Game): void {
    const popupDetails = this.dialog.open<PopupComponent, Game>(PopupComponent, {
      data: game,
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }
}
