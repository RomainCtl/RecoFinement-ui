import { GroupService } from './../../../services/group/group.service';
import { User } from './../../../shared/models/user.model';
import { UserDtoResponse } from './../../../shared/models/DtoResponse/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public userData: UserDtoResponse) { }

  ngOnInit(): void {
  }

  searchPotentialMembers(searchTerm: string): void {

    if (searchTerm.length > 4) {
      this.isLoading = true;
      this.userService.searchUser(searchTerm).then((result: UserDataDtoResponse) => {
        this.searchedUsers = result.content;
        this.isLoading = false;
      });
    }
  }

  inviteMember(): void {
    this.groupService.inviteMember()
  }

}
