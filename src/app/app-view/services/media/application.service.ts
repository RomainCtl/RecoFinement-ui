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
  private urlGetRecommendedAppsForUser = environment.api_url + '/application/user?reco_engine=';
  private urlGetRecommendedAppsFromGroups = environment.api_url + '/application/groups?reco_engine=';
  private urlGetPopularApplications = environment.api_url + '/application?page=';
  private urlSearchApplication = environment.api_url + '/application/search/';
  private urlGetGenresApplications = environment.api_url + '/application/genres';
  private urlUserMeta = environment.api_url + '/application/';
  private urlAddApplication= environment.api_url + '/application';
  private urlGetAppToValidate= environment.api_url + '/track/additional';
  private urlAppValidate= environment.api_url + '/track/additional/'


  constructor(private httpClient: HttpClient) { }

  getApplications(page: number): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetApplications + page).toPromise();
  }

  getPopularApplications(page: number = 1): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetPopularApplications + page).toPromise();
  }

  getRecommendedAppsForUser(engine: string): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetRecommendedAppsForUser + engine).toPromise();
  }

  getRecommendedAppsFromGroups(engine: string): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetRecommendedAppsFromGroups + engine).toPromise();
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

  postNewApp(payload: any): Promise<any> {
    return this.httpClient.post<any>(this.urlAddApplication, payload).toPromise();
  }

  getAppsToValidate(): Promise<ApplicationResponseDto> {
    return this.httpClient.get<ApplicationResponseDto>(this.urlGetAppToValidate).toPromise();
  }

  acceptAppToAdd(appId: number): Promise<ApplicationResponseDto> {
    return this.httpClient.put<ApplicationResponseDto>(this.urlAppValidate + appId, null).toPromise();
  }

  refuseAppToAdd(appId: number): Promise<ApplicationResponseDto> {
    return this.httpClient.delete<ApplicationResponseDto>(this.urlAppValidate + appId).toPromise();
  }

}
