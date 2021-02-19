import { Injectable, Input } from '@angular/core';

@Injectable()
export class TrackMeta {
    play_count = 0;
    @Input() rating = null;
    last_played_date = new Date();
}
