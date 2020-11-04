import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';
import { GroupDtoResponse } from 'src/app/shared/models/DtoResponse/group.model';
import { Group } from 'src/app/shared/models/group.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupMembersComponent } from '../groupMembers/groupMembers.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myGroups;
  public ownerGroups: Array<Group> = new Array<Group>();
  public groups;
  public otherGroups: Array<Group> = new Array<Group>();
  public invitations;
  public myUsername: string = localStorage.getItem('username');
  public myEmail: string = localStorage.getItem('email');
  public toggle = false;

  passwordError = '';
  userHttpResponse: UserDtoResponse = {
    message: '',
    status: true,
    user: null,
    errors: ['']
  };
  createGroupHttpResponse: GroupDtoResponse = {
    message: '',
    status: true,
    group: null,
    errors: ['']
  };

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserData(localStorage.getItem('uuid'))
      .then(
        (result: UserDtoResponse) => {
          this.invitations = result.user.invitations;

          this.myGroups = result.user.owned_groups;
          this.myGroups.forEach(group => {
            this.profileService.getGroup(group.group_id).then((groupResult: GroupDtoResponse) => {
              this.ownerGroups.push(groupResult.group);
            });
          });

          this.groups = result.user.groups;
          this.groups.forEach(group => {
            this.profileService.getGroup(group.group_id).then((groupResult: GroupDtoResponse) => {
              this.otherGroups.push(groupResult.group);
            });
          });
        }
      ).catch((result: HttpErrorResponse) => {
      });
  }

  editProfile(form: NgForm): void {
    if (form.value.username !== localStorage.getItem('username')) {
      this.userService.updateUser(localStorage.getItem('uuid'), { username: form.value.username }).then(
        (result: UserDtoResponse) => {
          this.userHttpResponse = result;
        }
      );
      localStorage.setItem('username', form.value.username);
    }

    if (form.value.email !== localStorage.getItem('email')) {
      this.userService.updateUser(localStorage.getItem('uuid'), { email: form.value.email }).then(
        (result: UserDtoResponse) => {
          this.userHttpResponse = result;
        }
      );
      localStorage.setItem('email', form.value.email);
    }

    if (form.value.password === form.value.confirmPassword) {
      if (form.value.password.length > 0) {
        this.userService.updateUser(localStorage.getItem('uuid'), { password: form.value.password }).then(
          (result: UserDtoResponse) => { this.userHttpResponse = result; }
        ).catch(
          (errors: HttpErrorResponse) => { this.userHttpResponse = errors.error; }
        );
      }
    } else {
      this.passwordError = 'Passwords don\'t match';
    }
  }

  deleteUser(): void {
    const uuid: string = localStorage.getItem('uuid');
    if (confirm('Are you sure you want to delete your account ? All your preferences and groups will also be deleted')) {
      this.userService.deleteUser(uuid);
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      this.router.navigate(['/']);
    }
  }

  addGroup(): void {
    this.toggle = !this.toggle;
  }

  createGroup(form: NgForm): void {
    this.profileService.addGroup({ name: form.value.groupName }).then(
      (result: GroupDtoResponse) => {
        this.createGroupHttpResponse = result;
        this.ownerGroups.push(result.group);
        this.toggle = !this.toggle;
      }).catch(
        (errors: HttpErrorResponse) => {
          this.createGroupHttpResponse = errors.error;
        }
      );
  }

  deleteGroup(group): void {
    if (confirm('Are you sure you want to delete the group ' + group.name + ' ?')) {
      this.ownerGroups.splice(this.ownerGroups.indexOf(group, 0), 1);
      this.profileService.deleteGroup(group.group_id);
    }
  }

  acceptInvit(invit): void {
    this.profileService.acceptInvitation(invit.group_id, localStorage.getItem('uuid'));
    this.invitations.splice(this.invitations.indexOf(invit, 0), 1);
    this.profileService.getGroup(invit.group_id).then((groupResult: GroupDtoResponse) => {
      groupResult.group.members.push({ uuid: '', username: this.myUsername, email: '' });
      this.otherGroups.push(groupResult.group);
    });
  }

  declineInvit(invit): void {
    this.profileService.declineInvitation(invit.group_id, localStorage.getItem('uuid'));
    this.invitations.splice(this.invitations.indexOf(invit, 0), 1);
  }

  linkSpotify(): void {
    window.open('https://accounts.spotify.com/fr/login', '_blanck');
  }

  openDialog(group): void {
    const dialogRef = this.dialog.open(GroupMembersComponent, {
      width: '350px',
      data: { group }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
