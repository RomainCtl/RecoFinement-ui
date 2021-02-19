import { TrackService } from 'src/app/app-view/services/media/track.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {

  media_url = new Object();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public track: Track, private sanitize: DomSanitizer, private trackService: TrackService, private bottom: MatBottomSheet) {
      this.media_url = this.sanitize.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.track.spotify_id);
  }

  savePlayCount(id: number): void {
    this.trackService.savePlayCount(id, { additional_count: 1 });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.savePlayCount(this.track.track_id);
  }

}
