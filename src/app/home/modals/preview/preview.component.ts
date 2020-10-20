import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Track } from 'src/app/shared/models/DtoResponse/musics/Track.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  media_url = new Object();

  constructor(@Inject(MAT_DIALOG_DATA) public track: Track, private sanitize: DomSanitizer) {
      this.media_url = this.sanitize.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.track.spotify_id);
  }

  ngOnInit(): void {}

}
