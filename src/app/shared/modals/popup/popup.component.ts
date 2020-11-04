import { TrackMetaResponseDto } from './../../models/DtoResponse/musics/track-meta.model';
import { TrackService } from 'src/app/services/media/track.service';
import { BookMeta } from './../../models/DtoResponse/books/BookMeta.model';
import { BookMetaResponseDto } from './../../models/DtoResponse/books/book-meta.model';
import { BookService } from 'src/app/services/media/book.service';
import { GameService } from 'src/app/services/media/game.service';
import { ApplicationService } from 'src/app/services/media/application.service';
import { GameMeta } from 'src/app/shared/models/DtoResponse/games/GameMeta.model';
import { ClickEvent } from 'angular-star-rating';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameMetaResponseDto } from 'src/app/shared/models/DtoResponse/games/game-meta.model';
import { ApplicationMeta } from '../../models/DtoResponse/applications/applicationMeta.model';
import { ApplicationMetaResponseDto } from '../../models/DtoResponse/applications/application-meta.model';
import { TrackMeta } from '../../models/DtoResponse/musics/TrackMeta.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
    private trackService: TrackService,
    private gameService: GameService,
    private bookService: BookService,
    private appService: ApplicationService) { }

  readOnly = false;
  gameUserMeta = new GameMeta();
  bookUserMeta = new BookMeta();
  appUserMeta = new ApplicationMeta();
  trackUserMeta = new TrackMeta();

  ngOnInit(): void {
    if (this.item.game_id) {
      this.gameService.getUserMeta(this.item.game_id).then((result: GameMetaResponseDto) => {
        this.gameUserMeta = result.content;
      });
    }
    if (this.item.isbn) {
      this.bookService.getUserMeta(this.item.isbn).then((result: BookMetaResponseDto) => {
        this.bookUserMeta = result.content;
      });
    }
    if (this.item.app_id) {
      this.appService.getUserMeta(this.item.app_id).then((result: ApplicationMetaResponseDto) => {
        this.appUserMeta = result.content;
      });
    }
    if (this.item.track_id) {
      this.trackService.getUserMeta(this.item.track_id).then((result: TrackMetaResponseDto) => {
        this.trackUserMeta = result.content;
      });
    }
  }

  saveRating(event: ClickEvent): void {
    if (this.item.track_id) {
      this.trackService.saveRating(this.item.track_id, { rating: event.rating });
    }
    if (this.item.game_id) {
      this.gameService.saveRating(this.item.game_id, { rating: event.rating });
    }
    if (this.item.isbn) {
      this.bookService.saveRating(this.item.isbn, { rating: event.rating });
    }
    if (this.item.app_id) {
      this.appService.saveRating(this.item.app_id, { rating: event.rating });
    }
  }

  goToSteam(): void {
    window.open('https://store.steampowered.com/app/' + this.item.steamid, '_blank');
  }

  savePurchasedData(event: MatCheckboxChange): void {
    if (this.item.game_id) {
      this.gameService.savePurchasedState(this.item.game_id, { purchase: event.checked });
    }
    if (this.item.isbn) {
      this.bookService.savePurchasedState(this.item.isbn, { purchase: event.checked});
    }
    if (this.item.app_id) {
      this.appService.saveDownloadedState(this.item.app_id, { downloaded: event.checked});
    }
  }

}
