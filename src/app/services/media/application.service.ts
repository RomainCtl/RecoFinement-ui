import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private urlGetPopularApplications = 'http://127.0.0.1:4040/api/application?page=1';

  constructor(private httpClient: HttpClient) { }

  getPopularApplications(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularApplications).toPromise();
  }
}
