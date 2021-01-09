import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  media_url = new Object();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public track: Track, private sanitize: DomSanitizer) {
      this.media_url = this.sanitize.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.track.spotify_id);
  }

  ngOnInit(): void {}

}
