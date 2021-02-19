import { Overlay } from '@angular/cdk/overlay';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PreviewComponent } from 'src/app/app-view/recofinement/musics/preview/preview.component';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { TrackHistoryResponseDto } from 'src/app/models/DtoResponse/musics/track-history.model';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-history-tracks',
  templateUrl: './history-tracks.component.html',
  styleUrls: ['./history-tracks.component.scss']
})
export class HistoryTracksComponent implements OnInit {

  constructor(
    private trackService: TrackService,
    private dialog: MatDialog,
    private bottom: MatBottomSheet,
    private overlay: Overlay
  ) { }

    tracks = {
      pageIndex: 0
    }

    tracksHistory: TrackHistoryResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  ngOnInit(): void {
    this.trackService.getHistoryTracks(1).then((result: TrackHistoryResponseDto) => {
      this.tracksHistory = result;
    });
  }

  private getHistoryMusics(page ?: number): void {
    this.trackService.getHistoryTracks(page).then((result: TrackHistoryResponseDto) => {
      this.tracksHistory = result;
    });
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

  trackPageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getHistoryMusics(page.pageIndex+1);
      this.tracks.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getHistoryMusics();
      } else {
        this.getHistoryMusics(page.pageIndex+1)
      }
      this.tracks.pageIndex--;
    }
  }

}
