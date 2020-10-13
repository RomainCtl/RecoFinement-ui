import { MatDialog } from '@angular/material/dialog';
import { TrackService } from 'src/app/services/media/track.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackResponseDto } from 'src/app/shared/models/DtoResponse/track.model';
import { PopupComponent } from './popup/popup/popup.component';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit {

  constructor(
    private trackService: TrackService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  trackResponse: TrackResponseDto;

  nextPage = 2;
  finished = false;

  ngOnInit(): void {
    this.trackService.getTracks(1).then((result: TrackResponseDto) => {
      this.trackResponse = result;
    });
  }

  onScroll(): void {
    console.log('scrolled');
    if (this.nextPage <= this.trackResponse.total_pages) {
      this.getMusics(this.nextPage);
    } else {
      this.snackBar.open('You have reached the end of the Internet!', 'Alright!');
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
      console.log(this.trackResponse.content);
    });
  }

  openDialog(index: number): void {
    this.snackBar.openFromComponent(PopupComponent, {
      data: this.trackResponse.content[index],
      horizontalPosition: 'start',
      panelClass: 'bg-light'
    });

    // console.log(index);
    // const dialogRef = this.dialog.open(PopupComponent, {
    //   data: {
    //     track: this.trackResponse.content,
    //     indexOfElement: index
    //   }

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  closeSnackBar(): void {
    this.snackBar.dismiss();
  }

}
