import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationResponseDto } from 'src/app/shared/models/DtoResponse/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private urlGetApplications = 'http://127.0.0.1:4040/api/application?page=';
  private urlGetPopularApplications = 'http://127.0.0.1:4040/api/application?page=1';
  private urlGetGenresApplications = 'http://127.0.0.1:4040/api/application/genres';

  constructor(private httpClient: HttpClient) { }

  getApplications(page: number): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetApplications + page).toPromise();
  }

  getPopularApplications(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularApplications).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenresApplications).toPromise();
  }
}
