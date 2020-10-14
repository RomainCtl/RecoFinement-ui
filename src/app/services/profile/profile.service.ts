import { InviteMemberDtoResponse } from 'src/app/shared/models/DtoResponse/invite-member.model';
import { CreateGroupDtoRequest } from './../../shared/models/DtoRequest/create-group.model';
import { GroupDtoResponse } from './../../shared/models/DtoResponse/group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InviteMemberDtoRequest } from 'src/app/shared/models/DtoRequest/invite-member.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private urlGetGroup = 'http://127.0.0.1:4040/api/group';

  constructor(private httpClient: HttpClient) { }

  getGroup(id: number): Promise<GroupDtoResponse> {
    return this.httpClient.get<GroupDtoResponse>(this.urlGetGroup + '/' + id).toPromise();
  }

  addGroup(payload: CreateGroupDtoRequest): Promise<GroupDtoResponse> {
    return this.httpClient.post<GroupDtoResponse>(this.urlGetGroup, payload).toPromise();
  }

  deleteGroup(id: number): void {
    this.httpClient.delete<void>(this.urlGetGroup + '/' + id);
  }

  inviteMember(payload: InviteMemberDtoRequest, id: number): Promise<InviteMemberDtoResponse> {
    return this.httpClient.post<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations', payload).toPromise();
  }

  acceptInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.put<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }

  deleteInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.delete<InviteMemberDtoResponse>(this.urlGetGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }
}
