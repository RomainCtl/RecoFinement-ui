import { BookMeta } from './../../models/DtoResponse/books/BookMeta.model';
import { BookMetaResponseDto } from './../../models/DtoResponse/books/book-meta.model';
import { BookService } from 'src/app/services/media/book.service';
import { GameService } from 'src/app/services/media/game.service';
import { GameMeta } from 'src/app/shared/models/DtoResponse/games/GameMeta.model';
import { ClickEvent } from 'angular-star-rating';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GameMetaResponseDto } from 'src/app/shared/models/DtoResponse/games/game-meta.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
    private gameService: GameService,
    private bookService: BookService) { }

  readOnly = false;
  gameUserMeta = new GameMeta();
  bookUserMeta = new BookMeta();

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
  }

  saveRating(event: ClickEvent): void {
    if (this.item.game_id) {
      this.gameService.saveRating(this.item.game_id, { rating: event.rating });
    }
    if (this.item.isbn) {
      this.bookService.saveRating(this.item.isbn, { rating: event.rating });
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
  }

}
