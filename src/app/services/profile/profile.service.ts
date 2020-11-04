import { InviteMemberDtoResponse } from 'src/app/shared/models/DtoResponse/invite-member.model';
import { CreateGroupDtoRequest } from './../../shared/models/DtoRequest/create-group.model';
import { GroupDtoResponse } from './../../shared/models/DtoResponse/group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InviteMemberDtoRequest } from 'src/app/shared/models/DtoRequest/invite-member.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private urlGetGroup = environment.api_url + '/group';

  constructor(private httpClient: HttpClient) { }

  getGroup(id: number): Promise<GroupDtoResponse> {
    return this.httpClient.get<GroupDtoResponse>(this.urlGetGroup + '/' + id).toPromise();
  }

  addGroup(payload: CreateGroupDtoRequest): Promise<GroupDtoResponse> {
    return this.httpClient.post<GroupDtoResponse>(this.urlGetGroup, payload).toPromise();
  }

  deleteGroup(id: number): Promise<GroupDtoResponse> {
    return this.httpClient.delete<GroupDtoResponse>(this.urlGetGroup + '/' + id).toPromise();
  }

  inviteMember(payload: InviteMemberDtoRequest, id: number): Promise<InviteMemberDtoResponse> {
    return this.httpClient.post<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations', payload).toPromise();
  }

  acceptInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.put<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }

  declineInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.delete<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }
}
