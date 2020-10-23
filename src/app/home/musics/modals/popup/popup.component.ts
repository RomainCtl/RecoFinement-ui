import { Game } from './../../../../shared/models/DtoResponse/games/Game.model';
import { GameService } from 'src/app/services/media/game.service';
import { GameMeta } from '../../../../shared/models/DtoResponse/games/GameMeta.model';
import { ClickEvent } from 'angular-star-rating';
import { RatingService } from './../../../../services/rating/rating.service';
import { PreviewComponent } from './../preview/preview.component';
import { MusicsComponent } from './../../musics.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Track } from './../../../../shared/track.model';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameMetaResponseDto } from 'src/app/shared/models/DtoResponse/games/game-meta.model';

export interface DialogData {
  track: Track[];
  indexOfElement: number;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public item: any, private gameService: GameService) { }

  readOnly = false;
  gameUserMeta = new GameMeta();

  ngOnInit(): void {
    this.gameService.getUserMeta(this.item.game_id).then((result: GameMetaResponseDto) => {
      this.gameUserMeta = result.content;
    });
  }

  saveGameRating(event: ClickEvent): void {
    this.gameService.saveRating(this.item.game_id, { rating: event.rating });
  }

  goToSteam(): void {
    window.open('https://store.steampowered.com/app/' + this.item.steamid, '_blank');
  }

  savePurchasedData(event: MatCheckboxChange): void {
    this.gameService.savePurchasedState(this.item.game_id, { purchase: event.checked });
  }

}
