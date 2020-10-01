import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor() { }

  saveRating(rate: number, id: number) {
    console.log("media : "+ id +" -> " + rate)
    // TODO send rate to api via id
  }

}
