import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  private urlGetOauthSpotify = environment.api_url + '/external/spotify';
  private urlGetOauthSpotifyCallback = environment.api_url + '/external/spotify/callback';

  private urlGetOauthTmdb = environment.api_url + '/external/tmdb';
  private urlGetOauthTmdbCallback = environment.api_url + '/external/tmdb/callback';

  constructor(private httpClient: HttpClient) { }

  getOAuthSpotify(): Promise<any> {
    return this.httpClient.get(this.urlGetOauthSpotify).toPromise();
  }

  callbackSpotify(codeCsrf, stateToken): Promise<any> {
    return this.httpClient.post(this.urlGetOauthSpotifyCallback, { code: codeCsrf, state: stateToken}).toPromise();
  }

  getOAuthTmdb(): Promise<any> {
    return this.httpClient.get(this.urlGetOauthTmdb).toPromise();
  }

  callbackTmdb(token, isApproved): Promise<any> {
    return this.httpClient.post(this.urlGetOauthTmdbCallback, { request_token: token, approved: isApproved }).toPromise();
  }
}
