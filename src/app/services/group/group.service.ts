import { Observable } from 'rxjs';
import { InviteMemberDtoResponse } from 'src/app/shared/models/DtoResponse/invite-member.model';
import { CreateGroupDtoRequest } from '../../shared/models/DtoRequest/create-group.model';
import { GroupDtoResponse } from '../../shared/models/DtoResponse/group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InviteMemberDtoRequest } from 'src/app/shared/models/DtoRequest/invite-member.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private urlBaseGroup = environment.api_url + '/group';

  constructor(private httpClient: HttpClient) { }

  getGroup(id: number): Promise<GroupDtoResponse> {
    return this.httpClient.get<GroupDtoResponse>(this.urlBaseGroup + '/' + id).toPromise();
  }

  addGroup(groupName: string): Promise<GroupDtoResponse> {
    return this.httpClient.post<GroupDtoResponse>(this.urlBaseGroup, { name: groupName }).toPromise();
  }

  deleteGroup(id: number): Promise<GroupDtoResponse> {
    return this.httpClient.delete<GroupDtoResponse>(this.urlBaseGroup + '/' + id).toPromise();
  }

  inviteMember(userId, id: number): Observable<InviteMemberDtoResponse> {
    return this.httpClient.post<InviteMemberDtoResponse>(this.urlBaseGroup + '/' + id + '/invitations', { uuid: userId});
  }

  acceptInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.put<InviteMemberDtoResponse>(this.urlBaseGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }

  declineInvitation(id: number, uuid: string): Promise<InviteMemberDtoResponse> {
    return this.httpClient.delete<InviteMemberDtoResponse>(this.urlBaseGroup + '/' + id + '/invitations/' + uuid, {}).toPromise();
  }
}
