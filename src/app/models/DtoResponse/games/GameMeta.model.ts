import { Directive, Injectable, Input } from '@angular/core';

@Injectable()
export class GameMeta {
    purchase = false;
    additional_hours = 0;
    @Input() rating = null;
}
