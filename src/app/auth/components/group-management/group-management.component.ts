import { UserService } from './../../../services/user/user.service';
import { GroupDtoResponse } from './../../../shared/models/DtoResponse/group.model';
import { GroupService } from './../../../services/group/group.service';
import { Group } from './../../../shared/models/group.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})


export class GroupManagementComponent implements OnInit {

  groupWithMembers: Group;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private groupService: GroupService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.groupService.getGroup(this.data.group.group_id).then((result: GroupDtoResponse) => {
      this.groupWithMembers = result.group;
    });
  }

  leaveGroup(group_id: number): void {
    this.groupService.deleteGroup(group_id).then(() => {
      this.dialog.openDialogs[0].close();
    });
  }

}
