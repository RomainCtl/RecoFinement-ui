import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { PreviewComponent } from 'src/app/app-view/recofinement/musics/preview/preview.component';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateTrackDtoRequest } from 'src/app/models/DtoRequest/add-media/create_track.model';
import { TrackResponseDto } from 'src/app/models/DtoResponse/musics/track-dto.model';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { AddMediaComponent } from 'src/app/shared-features/modals/popup/add-media/add-media.component';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { SliderComponent } from '../../../shared-features/slider/slider/slider.component';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit  {

  @ViewChild(SliderComponent) musicSwiper: SliderComponent;

  constructor(
    private trackService: TrackService,
    public dialog: MatDialog,
    public overlay: Overlay,
    public bottom: MatBottomSheet) { }

  musicPreviewRef: MatDialogRef < PreviewComponent > ;

  popularTracks: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedTracksFromProfile: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedTracksFromGroupsFromProfile: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedTracksFromGroupsFromSimilarContent: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedTracksFromSimilarContent: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedTracksFromCollaborativeFiltering: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recoChoice: boolean = true;

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'start',
    panelClass: ['shadow-none', 'm-0', 'p-0', 'w-100']
  };

  ngOnInit(): void {
    this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
      this.popularTracks = result;
    });
    this.trackService.getRecommendedTracksForUser('FromProfile').then((result: TrackResponseDto) => {
      this.recommendedTracksFromProfile = result;
    });
    this.trackService.getRecommendedTracksForUser('FromSimilarContent').then((result: TrackResponseDto) => {
      this.recommendedTracksFromSimilarContent = result;
    });
    this.trackService.getRecommendedTracksForUser('CollaborativeFiltering').then((result: TrackResponseDto) => {
      this.recommendedTracksFromSimilarContent = result;
    });
    this.trackService.getRecommendedTracksFromGroups('FromProfile').then((result: TrackResponseDto) => {
      this.recommendedTracksFromGroupsFromProfile = result;
    })
    this.trackService.getRecommendedTracksFromGroups('FromSimilarContent').then((result: TrackResponseDto) => {
      this.recommendedTracksFromGroupsFromSimilarContent = result;
    })
  }

  openPreview(item: Track): void {

    this.bottom.open(PreviewComponent, {
      data: item,
      hasBackdrop: false,
      panelClass: ['shadow-none', 'bg-transparent', 'm-0', 'p-0'],
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      direction: 'ltr'
    });

  }

  openPopUp(item: Track): void {
    const popupDetails = this.dialog.open < PopupComponent,
      Track > (PopupComponent, {
        data: item,
        panelClass: ['shadow-none'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

  }

  toggleRecommendBy() {
    this.recoChoice = !this.recoChoice;
  }

  openAddMedia(): void {
    const popupDetails = this.dialog.open < AddMediaComponent,
      CreateTrackDtoRequest > (AddMediaComponent, {
        data: new CreateTrackDtoRequest(),
        panelClass: ['shadow-none', 'w-50'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }
}
