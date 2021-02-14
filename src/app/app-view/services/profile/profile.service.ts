import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private urlManageProfile = environment.api_url + '/profile';
  private urlPostContent= '/content/'
  private urlHistory= '/history';

  constructor(private http: HttpClient) { }

  getListProfile(): Promise<any> {
    return this.http.get<any>(this.urlManageProfile).toPromise();
  }

  createNewProfile(name: string): Promise<any> {
    return this.http.post<any>(this.urlManageProfile, {profilename: name}).toPromise();
  }

  deleteProfile(uuid: string): Promise<any> {
    return this.http.delete(this.urlManageProfile + "/" + uuid).toPromise();
  }

  editProfile(uuid: string, payload: string): Promise<any> {
    return this.http.patch(this.urlManageProfile + "/" + uuid, {profilename: payload}).toPromise();
  }

  addGenreToProfile(uuid: string, id_genre: string): Promise<any> {
    return this.http.put(this.urlManageProfile + "/" + uuid + "/genre/" + id_genre, '').toPromise();
  }

  getGenreToProfile(uuid: string): Promise<any> {
    return this.http.get(this.urlManageProfile + "/" + uuid + "/genre").toPromise();
  }

  putNewMetaToProfile(uuid: string, content_id: string, payload: any): Promise<any> {
    return this.http.put(this.urlManageProfile + "/" + uuid + this.urlPostContent +content_id + '/meta', payload).toPromise();
  }

  getExecutionHistory(uuid: string): Promise<any> {
    return this.http.get(this.urlManageProfile + "/" + uuid + this.urlHistory).toPromise();
  }
}
