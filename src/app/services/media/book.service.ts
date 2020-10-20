import { Book } from './../../shared/models/DtoResponse/books/Book.model';
import { BookResponseDto } from 'src/app/shared/models/DtoResponse/books/book-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlGetPopularBooks = 'http://127.0.0.1:4040/api/book';
  private urlSearchBooks = 'http://127.0.0.1:4040/api/book/search/';

  constructor(private httpClient: HttpClient) { }

  getPopularBooks(page: number): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularBooks + '?page=' + page).toPromise();
  }

  searchBooks(searchTerm: string): Promise<BookResponseDto> {
      return this.httpClient.get<BookResponseDto>(this.urlSearchBooks + searchTerm + '?page=1').toPromise();
  }
}
