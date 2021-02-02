import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { SeriesResponseDto } from '../../../models/DtoResponse/series/series-dto.model';
import { Series } from '../../../models/DtoResponse/series/Series.model';
import { SeriesService } from '../../services/media/serie.service';
import { PreviewComponent } from '../musics/preview/preview.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(
    private seriesService: SeriesService,
    public dialog: MatDialog,
    public overlay: Overlay) { }

  musicPreviewRef: MatDialogRef < PreviewComponent > ;

  popularSeries: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedSeriesForUserFromProfile: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedSeriesForUserFromSimilarContent: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedSeriesFromGroupsFromProfile: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };


  recommendedSeriesFromGroupsFromSimilarContent: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'start',
    panelClass: ['shadow-none', 'm-0', 'p-0', 'w-100']
  };

  ngOnInit(): void {
    this.seriesService.getPopularSeries().then((result: SeriesResponseDto) => {
      this.popularSeries = result;
    });
    this.seriesService.getRecommendedSeriesForUser('FromProfile').then((result: SeriesResponseDto) => {
      this.recommendedSeriesForUserFromProfile = result;
    });
    this.seriesService.getRecommendedSeriesForUser('FromSimilarContent').then((result: SeriesResponseDto) => {
      this.recommendedSeriesForUserFromSimilarContent = result;
    });
    this.seriesService.getRecommendedSeriesFromGroups('FromProfile').then((result: SeriesResponseDto) => {
      this.recommendedSeriesFromGroupsFromProfile = result;
    })
    this.seriesService.getRecommendedSeriesFromGroups('FromSimilarContent').then((result: SeriesResponseDto) => {
      this.recommendedSeriesFromGroupsFromSimilarContent = result;
    })
  }

  openPopUp(series: Series): void {
    const popupDetails = this.dialog.open < PopupComponent,
      Series > (PopupComponent, {
        data: series,
        panelClass: ['shadow-none', 'w-75', 'h-75'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

  }

}
