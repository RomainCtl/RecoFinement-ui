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
  private urlGetRecommendedBooksForUser = environment.api_url + '/book/user?reco_engine=';
  private urlGetRecommendedBooksFromGroups = environment.api_url + '/book/groups?reco_engine=';
  private urlSearchBooks = environment.api_url + '/book/search/';
  private urlUserMeta = environment.api_url + '/book/';
  private urlAddBook = environment.api_url + '/book';

  constructor(private httpClient: HttpClient) { }

  getPopularBooks(page: number = 1): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularBooks + '?page=' + page).toPromise();
  }

  getRecommendedBooksForUser(engine: string): Promise<BookResponseDto> {
    return this.httpClient.get<BookResponseDto>(this.urlGetRecommendedBooksForUser + engine).toPromise();
  }

  getRecommendedBooksFromGroups(engine: string): Promise<BookResponseDto> {
    return this.httpClient.get<BookResponseDto>(this.urlGetRecommendedBooksFromGroups + engine).toPromise();
  }

  searchBooks(searchTerm: string): Promise<BookResponseDto> {
    return this.httpClient.get<BookResponseDto>(this.urlSearchBooks + searchTerm).toPromise();
  }

  getUserMeta(content_id: number): Promise<BookMetaResponseDto> {
    return this.httpClient.get<BookMetaResponseDto>(this.urlUserMeta + content_id + '/meta').toPromise();
  }

  savePurchasedState(content_id: number, gameMeta: any): Promise<BookMetaResponseDto> {
    return this.httpClient.patch<BookMetaResponseDto>(this.urlUserMeta + content_id + '/meta', gameMeta).toPromise();
  }

  saveRating(content_id: number, gameMeta: any): Promise<BookMetaResponseDto> {
    return this.httpClient.patch<BookMetaResponseDto>(this.urlUserMeta + content_id + '/meta', gameMeta).toPromise();
  }

  postNewBook(payload: any): Promise<any> {
    return this.httpClient.post<any>(this.urlAddBook, payload).toPromise();
  }
}
