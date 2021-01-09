import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { ApplicationMetaResponseDto } from 'src/app/models/DtoResponse/applications/application-meta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private urlGetApplications = environment.api_url + '/application?page=';
  private urlGetPopularApplications = environment.api_url + '/application?page=1';
  private urlSearchApplication = environment.api_url + '/application/search/';
  private urlGetGenresApplications = environment.api_url + '/application/genres';
  private urlUserMeta = environment.api_url + '/application/';

  constructor(private httpClient: HttpClient) { }

  getApplications(page: number): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetApplications + page).toPromise();
  }

  getPopularApplications(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularApplications).toPromise();
  }

  searchApplications(searchTerm: string): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlSearchApplication + searchTerm + '?page=1').toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenresApplications).toPromise();
  }

  getUserMeta(applicationId: number): Promise<ApplicationMetaResponseDto> {
    return this.httpClient.get<ApplicationMetaResponseDto>(this.urlUserMeta + applicationId + '/meta').toPromise();
  }

  saveDownloadedState(applicationId: number, applicationMeta: any): Promise<ApplicationMetaResponseDto> {
    return this.httpClient.patch<ApplicationMetaResponseDto>(this.urlUserMeta + applicationId + '/meta', applicationMeta).toPromise();
  }

  saveRating(applicationId: number, applicationMeta: any): Promise<ApplicationMetaResponseDto> {
    return this.httpClient.patch<ApplicationMetaResponseDto>(this.urlUserMeta + applicationId + '/meta', applicationMeta).toPromise();
  }

}
