import { User } from './../../../shared/models/user.model';
import { UserDataDtoResponse } from './../../../shared/models/DtoResponse/user-data.model';
import { UserDtoResponse } from './../../../shared/models/DtoResponse/user.model';
import { UserService } from './../../../services/user/user.service';
import { Member } from './../../../shared/models/member.model';
import { GroupDtoResponse } from './../../../shared/models/DtoResponse/group.model';
import { GroupService } from './../../../services/group/group.service';
import { Group } from './../../../shared/models/group.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})


export class GroupManagementComponent implements OnInit {

  groupWithMembers: Group;

  constructor(@Inject(MAT_DIALOG_DATA) public group: Group, private groupService: GroupService, private userService: UserService) { }

  ngOnInit(): void {
    this.groupService.getGroup(this.group.group_id).then((result: GroupDtoResponse) => {
      this.groupWithMembers = result.group;
    });
  }

}
