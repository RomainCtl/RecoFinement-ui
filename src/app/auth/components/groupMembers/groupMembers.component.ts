import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { InviteMemberDtoRequest } from 'src/app/shared/models/DtoRequest/invite-member.model';
import { InviteMemberDtoResponse } from 'src/app/shared/models/DtoResponse/invite-member.model';
import { UserDataDtoResponse } from 'src/app/shared/models/DtoResponse/user-data.model';
import { Member } from 'src/app/shared/models/member.model';

@Component({
  selector: 'app-groupMembers',
  templateUrl: './groupMembers.component.html',
  styleUrls: ['./groupMembers.component.scss']
})
export class GroupMembersComponent implements OnInit {

  public toggle = false;
  public myUsername = localStorage.getItem('username');

  isLoading = false;
  invitationControle = new FormControl();
  filteredOptions: Member[] = [];

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
    this.invitationControle.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(value => {
        if (value)
          return from(this.userService.searchUser(value));
        else
          return from(this.filteredOptions);
      })
    ).subscribe((result: any) => {
      this.isLoading = false;
      if (result)
        return this.filteredOptions = result.content;
    });
  }

  displayUser(member: Member): string {
    return member ? member.username : '';
  }

  addMember(): void {
    this.toggle = !this.toggle;
    this.userDataHttpResponse.status = true;
    this.inviteMemberHttpResponse.status = true;
    this.inviteMemberHttpResponse.message = '';
  }

  inviteMember(): void {
    this.inviteMemberHttpResponse.status = true;
    this.inviteMemberHttpResponse.message = '';

    if (this.invitationControle) {
      const payload: InviteMemberDtoRequest = { uuid: this.invitationControle.value.uuid };
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
      this.userDataHttpResponse.errors = ['Invitation failed'];
    }
  }
}
