import { Injectable, Input } from '@angular/core';

@Injectable()
export class MovieMeta {
    review_see_count: number;
    watch_count: number;
    @Input() rating = null;
}
