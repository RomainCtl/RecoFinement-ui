import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { InviteMemberDtoRequest } from 'src/app/shared/models/DtoRequest/invite-member.model';
import { InviteMemberDtoResponse } from 'src/app/shared/models/DtoResponse/invite-member.model';
import { UserDataDtoResponse } from 'src/app/shared/models/DtoResponse/user-data.model';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-groupMembers',
  templateUrl: './groupMembers.component.html',
  styleUrls: ['./groupMembers.component.scss']
})
export class GroupMembersComponent implements OnInit {

  public toggle = false;
  public myUsername = localStorage.getItem('username');

  userDataHttpResponse: UserDataDtoResponse = {
    message: '',
    status: true,
    content: {
      uuid: '',
      email: '',
      username: '',
    },
    number_of_elements: 0,
    page: 0,
    total_pages: 0,
    errors: ['']
  };
  inviteMemberHttpResponse: InviteMemberDtoResponse = {
    status: true,
    message: '',
    group: null,
    members: null,
    invitations: null,
    errors: ['']
  }

  constructor(
    public dialogRef: MatDialogRef<GroupMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addMember(): void {
    this.toggle = !this.toggle;
    this.userDataHttpResponse.status = true;
    this.inviteMemberHttpResponse.status = true;
    this.inviteMemberHttpResponse.message = '';
  }

  inviteMember(form: NgForm): void {
    this.userDataHttpResponse.status = true;
    this.inviteMemberHttpResponse.status = true;
    this.inviteMemberHttpResponse.message = '';
    this.userService.getUserInfo(form.value.memberName).then(
      (result: UserDataDtoResponse) => {
        this.userDataHttpResponse = result;
        if (this.userDataHttpResponse.number_of_elements > 0) {
          const payload: InviteMemberDtoRequest = { uuid: this.userDataHttpResponse.content[0].uuid };
          this.profileService.inviteMember(payload, this.data.group.group_id).then(
            (inviteResult: InviteMemberDtoResponse) => {
              this.inviteMemberHttpResponse = inviteResult;
            }
          ).catch(
            (inviteErrors: HttpErrorResponse) => {
              this.inviteMemberHttpResponse.status = inviteErrors.error.status;
              this.inviteMemberHttpResponse.errors = [inviteErrors.error.message];
            }
          );
        } else {
          this.userDataHttpResponse.status = false;
          this.userDataHttpResponse.errors = ['Unknown username'];
        }
      }
    );
  }
}
