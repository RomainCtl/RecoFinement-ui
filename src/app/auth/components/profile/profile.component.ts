import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ExternalService } from './../../../services/external/external.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';
import { GroupDtoResponse } from 'src/app/shared/models/DtoResponse/group.model';
import { Group } from 'src/app/shared/models/group.model';
import { MatDialog } from '@angular/material/dialog';
import { GroupMembersComponent } from '../groupMembers/groupMembers.component';
import { User } from 'src/app/shared/models/user.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myGroups: Group[] = [];
  public ownerGroups: Group[] = [];
  public groups: Group[] = [];
  public otherGroups: Group[] = [];
  public myUsername: string = localStorage.getItem('username');
  public myEmail: string = localStorage.getItem('email');
  public toggle = false;

  passwordError = '';
  userHttpResponse: UserDtoResponse = {
    message: '',
    status: true,
    user: new User(),
    errors: ['']
  };
  createGroupHttpResponse: GroupDtoResponse = {
    message: '',
    status: true,
    group: new Group(),
    errors: ['']
  };
  spotifyLinked = false;
  tmdbLinked = false;
  googleLinked = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private externalService: ExternalService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookie: CookieService,
    private route: ActivatedRoute) { }

  userData: UserDtoResponse = {
    status: false,
    message: '',
    user: {
      uuid: '',
      email: '',
      username: '',
      groups: [],
      invitations: [],
      owned_groups: [],
      preferences_defined: false
    },
    errors: ['']
  };

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params.code) {
        this.externalService.getOAuthSpotify().then((result: any) => {
          if (result.spotify_url !== 'linked') {
            this.externalService.callbackSpotify(params.code, params.state).then(() => {
              this.router.navigate([this.route.snapshot.routeConfig.path]);
              this.snackBar.open('Your spotify account is now linked!', 'Great!', { horizontalPosition: 'start' });
            });
          }
        });
      }
      if (params.approved) {
        this.externalService.getOAuthTmdb().then((result: any) => {
          if (result.tmdb_url !== 'linked') {
            this.externalService.callbackTmdb(params.request_token, params.approved).then(() => {
              this.router.navigate([this.route.snapshot.routeConfig.path]);
              this.snackBar.open('Your tmdb account is now linked!', 'Great!', { horizontalPosition: 'start' });
            });
          }
        });
      } else if (params.denied) {
        this.snackBar.open('There was a problem linking your TMDB account', 'Alright!', { horizontalPosition: 'start' });
      }
    });

    this.userService.getUserData(this.cookie.get('user_id'))
      .then(
        (result: UserDtoResponse) => {
          this.userData = result;
          this.userData.user.owned_groups.forEach(group => {
            this.profileService.getGroup(group.group_id).then((groupResult: GroupDtoResponse) => {
              this.myGroups.push(groupResult.group);
            });
          });

          this.userData.user.groups.forEach(group => {
            this.profileService.getGroup(group.group_id).then((groupResult: GroupDtoResponse) => {
              this.groups.push(groupResult.group);
            });
          });
        }
      );
  }

  editProfile(form: NgForm): void {
    if (form.value.username !== '') {
      this.userService.updateUser(this.userData.user.uuid, { username: form.value.username }).then(
        (result: UserDtoResponse) => {
          this.userData = result;
          window.location.reload();
        }
      );
    }

    if (form.value.email !== '') {
      this.userService.updateUser(this.userData.user.uuid, { email: form.value.email }).then(
        (result: UserDtoResponse) => {
          this.userData = result;
          window.location.reload();
        }
      );
    }

    if (form.value.password === form.value.confirmPassword) {
      if (form.value.password !== '') {
        this.userService.updateUser(this.userData.user.uuid, { password: form.value.password }).then(
          (result: UserDtoResponse) => {
            this.userData = result;
            window.location.reload();
          }
        );
      }

    } else {
      this.passwordError = 'Passwords don\'t match';
    }
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account ? All your preferences and groups will also be deleted')) {
      this.userService.deleteUser(this.userData.user.uuid);
      this.cookie.delete('access_token', '/');
      this.router.navigate(['/login']);
    }
  }

  addGroup(event: any): void {
    this.toggle = !this.toggle;
    if (!this.toggle) {
      console.log(event);
    }
  }

  createGroup(form: NgForm): void {
    this.profileService.addGroup({ name: form.value.groupName }).then(
      (result: GroupDtoResponse) => {
        this.myGroups.push(result.group);
        this.toggle = !this.toggle;
      });
  }

  deleteGroup(group): void {
    console.log(group);
    if (confirm('Are you sure you want to delete the group ' + group.name + ' ?')) {
      if (group.owner.username === this.myUsername) {
        this.myGroups.splice(this.myGroups.indexOf(group, 0), 1);
      } else {
        this.groups.splice(this.groups.indexOf(group, 0), 1);
      }
      this.profileService.deleteGroup(group.group_id);
    }
  }

  acceptInvit(invit): void {
    this.profileService.acceptInvitation(invit.group_id, this.userData.user.uuid);
    this.userData.user.invitations.splice(this.userData.user.invitations.indexOf(invit, 0), 1);
    this.profileService.getGroup(invit.group_id).then((groupResult: GroupDtoResponse) => {
      groupResult.group.members.push({ uuid: '', username: this.userData.user.username, email: '' });
      this.groups.push(groupResult.group);
    });
  }

  declineInvit(invit): void {
    this.profileService.declineInvitation(invit.group_id, this.userData.user.uuid);
    this.userData.user.invitations.splice(this.userData.user.invitations.indexOf(invit, 0), 1);
  }

  linkSpotify(): void {
    this.externalService.getOAuthSpotify().then((result: any) => {
      if (result.spotify_url !== 'linked') {
        window.location.href = result.spotify_url;
      } else {
        this.spotifyLinked = true;
      }
    });
  }

  checkLinkedAccounts(tabIndex): void {
    if (tabIndex === 2) {
      this.externalService.getOAuthSpotify().then((result: any) => {
        if (result.spotify_url !== 'linked') {
          this.spotifyLinked = false;
        } else {
          this.spotifyLinked = true;
        }
      });
      this.externalService.getOAuthTmdb().then((result: any) => {
        if (result.tmdb_url !== 'linked') {
          this.tmdbLinked = false;
        } else {
          this.tmdbLinked = true;
        }
      });
    }
  }

  linkTMDB(): void {
    this.externalService.getOAuthTmdb().then((result: any) => {
      if (result.tmdb_url !== 'linked') {
        window.location.href = result.tmdb_url;
      } else {
        this.tmdbLinked = true;
      }
    });
  }

  linkGoogleBooks(): void {

  }

  openDialog(group): void {
    this.dialog.open(GroupMembersComponent, {
      width: '350px',
      data: { group }
    });
  }

  exportData(): void {
    this.userService.exportUserData().then(data => {
      const blob = new Blob([JSON.stringify(data.user)], { type: 'application/json' });
      saveAs(blob, 'data.json');
    });
  }
}
