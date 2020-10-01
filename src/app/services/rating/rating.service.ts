import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }

  private urlPostTrackRate: string = "http://127.0.0.1:4040/api/user/track";

  saveRating(rate: number, id: number): Promise<any> {   
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDE1NzI1NjUsIm5iZiI6MTYwMTU3MjU2NSwianRpIjoiZjc5NTYzZGEtNzRkYS00MTliLWFhMWMtMGU5YmQ3ZTA3MzVlIiwiZXhwIjoxNjAxNjE1NzY1LCJpZGVudGl0eSI6ImFlYTA4ZmQxLTA3NjAtNGE0OS1iZWIwLTJkNjM1MTNhMWI1YSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9._6frMUWt6PylE8Y7QYfGVJ_ih9fy9gMMwt7WO-LpF_E");
     
    return this.httpClient.post(this.urlPostTrackRate, {'track_id':id, 'rating':rate}, {headers: headers}).toPromise();
  }

}
