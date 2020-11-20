import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from './../../../services/group/group.service';
import { User } from './../../../shared/models/user.model';
import { UserDtoResponse } from './../../../shared/models/DtoResponse/user.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from './../../../services/user/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UserDataDtoResponse } from 'src/app/shared/models/DtoResponse/user-data.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  isLoading = false;
  searchedUsers: User[];
  userInvited = false;
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cookie: CookieService,
    @Inject(MAT_DIALOG_DATA) public userData: UserDtoResponse) { }

  ngOnInit(): void {
  }

  searchPotentialMembers(searchTerm: string, event: KeyboardEvent): void {

    // tslint:disable-next-line: deprecation
    if (searchTerm.length > 3 && event.which <= 90 && event.which >= 48) {
      this.isLoading = true;
      this.userService.searchUser(searchTerm).then((result: UserDataDtoResponse) => {
        result.content = result.content.filter(user => user.uuid !== this.cookie.get('user_id'));
        this.searchedUsers = result.content;
        this.isLoading = false;
      });
    }
  }

  inviteMember(formData: any): void {
    if (this.searchedUsers) {
      const userToInvite = this.searchedUsers.filter(user => user.username === formData.memberPseudo)[0];
      this.groupService.inviteMember(userToInvite.uuid, formData.group_id).then(() => {
        this.dialog.openDialogs[0].close();
        this.snackBar.open('User ' + userToInvite.username + ' has been invited!', 'Great!',
        { horizontalPosition: 'start', duration: 10_000 });
      });
    }
  }

}
