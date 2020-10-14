import { MusicsComponent } from './../../musics.component';
import { Track } from './../../../../shared/track.model';
import { Component, Inject, OnInit, Sanitizer } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  track: Track[];
  indexOfElement: number;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  media_url: SafeResourceUrl;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Track, private sanitize: DomSanitizer) {
    if (this.data.spotify_id.startsWith('yt:')) {
      this.media_url = this.sanitize.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.data.spotify_id.split(':')[1]);
    } else {
      this.media_url = this.sanitize.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.data.spotify_id);
    }
   }

  ngOnInit(): void {
  }

}
