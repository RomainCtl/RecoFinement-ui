import { MatDialog } from '@angular/material/dialog';
import { GroupService } from './../../../services/group/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  newGroupName = '';

  constructor(private groupService: GroupService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createGroup(): void {
    this.groupService.addGroup(this.newGroupName).then(() => {
      this.dialog.openDialogs[0].close();
    });
  }
}
