import { Injectable, Input } from '@angular/core';

@Injectable()
export class ApplicationMeta {
  downloaded: boolean;
  review: string;
  @Input() rating = null;
}
