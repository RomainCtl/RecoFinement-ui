import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlGetPopularBooks = 'http://127.0.0.1:4040/api/book?page=1';

  constructor(private httpClient: HttpClient) { }

  getPopularBooks(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularBooks).toPromise();
  }
}
