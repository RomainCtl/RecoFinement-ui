import { DialogPosition, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { TrackResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-dto.model';
import * as $ from 'jquery';
import { Overlay } from '@angular/cdk/overlay';
import { Track } from 'src/app/shared/models/DtoResponse/musics/Track.model';
import { PreviewComponent } from '../modals/preview/preview.component';
import { PopupComponent } from '../modals/popup/popup.component';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  constructor(
    private trackService: TrackService,
    private mainSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay) { }

    musicPreviewRef: MatDialogRef<PreviewComponent>;

  trackResponse: TrackResponseDto = {
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

  nextPage = 3;
  finished = true;
  noTracks = true;

  ngOnInit(): void {
    this.trackService.getTracks(2).then((result: TrackResponseDto) => {
      this.trackResponse = result;
      if (result.number_of_elements !== 0) {
        this.noTracks = false;
      }
      if(this.nextPage !== this.trackResponse.total_pages) {
        this.finished = false;
      }
    });

  }

  onScroll(): void {
    if (this.nextPage <= this.trackResponse.total_pages) {
      this.getMusics(this.nextPage);
    } else {
      if (!this.noTracks) {
        this.mainSnackBar.open('You have reached the end of the Internet!', 'Alright!');
      }
      this.finished = true;
    }
  }

  get tracks(): TrackResponseDto {
    return this.trackResponse;
  }

  private getMusics(page?: number): void {
    this.trackService.getTracks(page).then((result: TrackResponseDto) => {
      this.trackResponse.content = this.trackResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPreview(index: number): void {

    if (this.dialog.getDialogById('musicPreview') !== undefined) {
      this.dialog.getDialogById('musicPreview').close();
    }

    setTimeout(() => {

      this.dialog.open(PreviewComponent, {
          data: this.trackResponse.content[index],
          width: '100%',
          hasBackdrop: false,
          position: {
            bottom: '0'
          },
          scrollStrategy: this.overlay.scrollStrategies.noop(),
          panelClass: ['shadow-none', 'fullPageWidth'],
          id: 'musicPreview'
        });

    }, 200);


      // this.dialog.getDialogById('musicPreview')._containerInstance._config.data = this.trackResponse.content[index];


 
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Track>(PopupComponent, {
      data: this.trackResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'bg-light'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

    // this.dialog.getDialogById('popupDetails').afterOpened().subscribe(() =>{
    //   this.dialog.getDialogById('popupDetails').close();
    // });
  }

}
