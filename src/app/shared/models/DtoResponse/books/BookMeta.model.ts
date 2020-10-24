import { Injectable, Input } from '@angular/core';

@Injectable()
export class BookMeta {
    purchase = false;
    @Input() rating = null;
}
