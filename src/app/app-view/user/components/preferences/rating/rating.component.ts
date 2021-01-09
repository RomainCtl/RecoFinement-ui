import { Component, Input, OnInit } from '@angular/core';
import { ClickEvent } from 'angular-star-rating';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() note: number;
  @Input() media: string;
  @Input() type: string;

  constructor(private trackService: TrackService,
    private gameService: GameService,
    private bookService: BookService,
    private movieService: MovieService,
    private serieService: SeriesService,
    private appService: ApplicationService) {
  }

  ngOnInit(): void {
  }

  onClick = ($event: ClickEvent) => {
    let prom: Promise<any>;
    switch (this.type) {
      case 'music':
        prom = this.trackService.saveRating(+this.media, { rating: $event.rating });
        break;
      case 'movie':
        prom = this.movieService.saveRating(+this.media, { rating: $event.rating });
        break;
      case 'serie':
        prom = this.serieService.saveRating(+this.media, { rating: $event.rating });
        break;
      case 'book':
        prom = this.bookService.saveRating(+this.media, { rating: $event.rating });
        break;
      case 'game':
        prom = this.gameService.saveRating(+this.media, { rating: $event.rating });
        break;
      case 'application':
        prom = this.appService.saveRating(+this.media, { rating: $event.rating });
        break;
    }
    prom.then(() => {
      this.note = $event.rating;
    }).catch((err) => {
      console.log(err);
    });
  }
}
