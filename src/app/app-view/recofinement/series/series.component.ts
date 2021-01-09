import { Series } from '../../../models/DtoResponse/series/Series.model';
import { SeriesService } from '../../services/media/serie.service';
import { SeriesResponseDto } from '../../../models/DtoResponse/series/series-dto.model';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { PreviewComponent } from '../musics/preview/preview.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(
    private seriesService: SeriesService,
    private mainSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay,
    public bottom: MatBottomSheet) { }

  musicPreviewRef: MatDialogRef < PreviewComponent > ;

  series: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };
  get content(): Series[] {
    return this.series.content;
  }

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'start',
    panelClass: ['shadow-none', 'm-0', 'p-0', 'w-100']
  };

  nextPage = 2;
  finished = true;
  noSeries = true;
  apiResponse = false;

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  appCtrl = new FormControl();
  filteredSeries: Observable<Series[]>;

  ngOnInit(): void {
    this.seriesService.getPopularSeries().then((result: SeriesResponseDto) => {
      this.series = result;
      this.apiResponse = true;
      if (result.number_of_elements !== 0) {
        this.noSeries = false;
      }
      if (this.nextPage !== this.series.total_pages) {
        this.finished = false;
      }
      this.filteredSeries = this.appCtrl.valueChanges
      .pipe(
        startWith(''),
        map(track => track ? this._filter(track) : this.series.content.slice())
      );
    });
  }
  private _filter(value: string): Series[] {
    const filterValue = value.toLowerCase();
    return this.series.content.filter(series => series.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onScroll(): void {
    if (this.nextPage <= this.series.total_pages) {
      this.getSeries(this.nextPage);
    } else {
      this.finished = true;
    }
  }

  private getSearchedTracks(searchTerm: string): void {
    this.seriesService.searchSeries(searchTerm).then((result: SeriesResponseDto) => {
      this.series.content = result.content;
      if (this.series.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
    });
  }

  private getSeries(page ?: number): void {
    this.seriesService.getSeries(page).then((result: SeriesResponseDto) => {
      this.series.content = this.series.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open < PopupComponent,
      Series > (PopupComponent, {
        data: this.series.content[index],
        panelClass: ['shadow-none', 'w-75', 'h-75'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

  }

  searchSeries(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.searchActivated = true;
      this.getSearchedTracks(searchTerm);
    }

    if (searchTerm.length === 0) {
      this.seriesService.getPopularSeries().then((result: SeriesResponseDto) => {
        this.series = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.noSeries = false;
        }
        if (this.nextPage !== this.series.total_pages) {
          this.finished = false;
        }
      });
    }
  }

}
