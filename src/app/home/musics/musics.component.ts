import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TrackResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-dto.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Overlay } from '@angular/cdk/overlay';
import { Track } from 'src/app/shared/models/DtoResponse/musics/Track.model';
import { PreviewComponent } from 'src/app/home/musics/preview/preview.component';
import { PopupComponent } from 'src/app/shared/modals/popup/popup.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit  {

  constructor(
    private trackService: TrackService,
    private mainSnackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay,
    public bottom: MatBottomSheet) { }

  musicPreviewRef: MatDialogRef < PreviewComponent > ;

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

  nextPage = 2;
  finished = true;
  noTracks = true;

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  appCtrl = new FormControl();
  filteredMusic: Observable<Track[]>;

  ngOnInit(): void {
    this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
      this.trackResponse = result;
      if (result.number_of_elements !== 0) {
        this.noTracks = false;
      }
      if (this.nextPage !== this.trackResponse.total_pages) {
        this.finished = false;
      }
      this.filteredMusic = this.appCtrl.valueChanges
      .pipe(
        startWith(''),
        map(track => track ? this._filter(track) : this.tracks.content.slice())
      );
    });
  }
  private _filter(value: string): Track[] {
    const filterValue = value.toLowerCase();
    return this.tracks.content.filter(track => track.title.toLowerCase().indexOf(filterValue) === 0);
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

  private getSearchedTracks(searchTerm: string): void {
    this.trackService.searchTracks(searchTerm).then((result: TrackResponseDto) => {
      this.trackResponse.content = result.content;
      if (this.trackResponse.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
    });
  }

  get tracks(): TrackResponseDto {
    return this.trackResponse;
  }

  private getMusics(page ?: number): void {
    this.trackService.getTracks(page).then((result: TrackResponseDto) => {
      this.trackResponse.content = this.trackResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPreview(index: number): void {

    this.savePlayCount(index);

    this.bottom.open(PreviewComponent, {
      data: this.trackResponse.content[index],
      hasBackdrop: false,
      panelClass: ['shadow-none', 'bg-transparent', 'm-0', 'p-0'],
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      direction: 'ltr'
    });

  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open < PopupComponent,
      Track > (PopupComponent, {
        data: this.trackResponse.content[index],
        panelClass: ['shadow-none'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });

  }

  searchTracks(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.searchActivated = true;
      this.getSearchedTracks(searchTerm);
    }

    if (searchTerm.length === 0) {
      this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
        this.trackResponse = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.noTracks = false;
        }
        if (this.nextPage !== this.trackResponse.total_pages) {
          this.finished = false;
        }
      });
    }
  }

  savePlayCount(id: number): void {
    this.trackService.savePlayCount(id, { additional_play_count: 1 });
  }
}
