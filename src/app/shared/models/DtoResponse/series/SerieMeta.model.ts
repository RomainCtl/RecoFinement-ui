import { Injectable, Input } from '@angular/core';

@Injectable()
export class SerieMeta {
    review_see_count: number;
    num_watched_episodes: number;
    @Input() rating = null;
}
