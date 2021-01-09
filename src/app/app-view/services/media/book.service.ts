import { BookMetaResponseDto } from '../../../models/DtoResponse/books/book-meta.model';
import { BookResponseDto } from 'src/app/models/DtoResponse/books/book-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlGetPopularBooks = environment.api_url + '/book';
  private urlSearchBooks = environment.api_url + '/book/search/';
  private urlUserMeta = environment.api_url + '/book/';

  constructor(private httpClient: HttpClient) { }

  getPopularBooks(page: number): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularBooks + '?page=' + page).toPromise();
  }

  searchBooks(searchTerm: string): Promise<BookResponseDto> {
    return this.httpClient.get<BookResponseDto>(this.urlSearchBooks + searchTerm).toPromise();
  }

  getUserMeta(isbn: number): Promise<BookMetaResponseDto> {
    return this.httpClient.get<BookMetaResponseDto>(this.urlUserMeta + isbn + '/meta').toPromise();
  }

  savePurchasedState(isbn: number, gameMeta: any): Promise<BookMetaResponseDto> {
    return this.httpClient.patch<BookMetaResponseDto>(this.urlUserMeta + isbn + '/meta', gameMeta).toPromise();
  }

  saveRating(isbn: number, gameMeta: any): Promise<BookMetaResponseDto> {
    return this.httpClient.patch<BookMetaResponseDto>(this.urlUserMeta + isbn + '/meta', gameMeta).toPromise();
  }
}
