import { GroupDtoResponse } from './../../../shared/models/DtoResponse/group.model';
import { Invitation } from './../../../shared/models/invitation.model';
import { AddMemberComponent } from './../add-member/add-member.component';
import { AddGroupComponent } from './../add-group/add-group.component';
import { GroupManagementComponent } from './../group-management/group-management.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ExternalService } from './../../../services/external/external.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from 'src/app/services/group/group.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { Group } from 'src/app/shared/models/group.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  passwordError = '';
  spotifyLinked = false;
  tmdbLinked = false;
  gbooksLinked = false;
  invitationsSent = [];

  constructor(
    private groupService: GroupService,
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

    console.log(this.invitationsSent)

    this.route.queryParams.subscribe(params => {
      if (params.code && params.state && params.scope) {
        this.externalService.getOAuthGbooks().then((result: any) => {
          if (result.gbooks_url !== 'linked') {
            this.externalService.callbackGbooks(params.state, params.code, params.scope).then(() => {
              this.router.navigate([this.route.routeConfig.path]);
              this.snackBar.open('Your Google Books account is now linked!', 'Great!', { horizontalPosition: 'start' });
            }).catch(() => {
              this.snackBar.open('There was a problem linking your Google Books account', 'Alright!', { horizontalPosition: 'start' });
            });
          }
        });
      }
      if (params.code && params.state && !params.scope) {
        this.externalService.getOAuthSpotify().then((result: any) => {
          if (result.spotify_url !== 'linked') {
            this.externalService.callbackSpotify(params.code, params.state).then(() => {
              this.router.navigate([this.route.snapshot.routeConfig.path]);
              this.snackBar.open('Your Spotify account is now linked!', 'Great!', { horizontalPosition: 'start' });
            }).catch(() => {
              this.snackBar.open('There was a problem linking your Spotofy account', 'Alright!', { horizontalPosition: 'start' });
            });
          }
        });
      }
      if (params.approved && params.request_token) {
        this.externalService.getOAuthTmdb().then((result: any) => {
          if (result.tmdb_url !== 'linked') {
            this.externalService.callbackTmdb(params.request_token, params.approved).then(() => {
              this.router.navigate([this.route.snapshot.routeConfig.path]);
              this.snackBar.open('Your tmdb account is now linked!', 'Great!', { horizontalPosition: 'start' });
            }).catch(() => {
              this.snackBar.open('There was a problem linking your TMDB account', 'Alright!', { horizontalPosition: 'start' });
            });
          }
        });
      } else if (params.denied) {
        this.snackBar.open('There was a problem linking your TMDB account', 'Alright!', { horizontalPosition: 'start' });
      }
    });

    this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
      this.userData = result;
      this.userData.user.owned_groups.forEach(group => {
        this.groupService.getGroup(group.group_id).then((result: GroupDtoResponse) => {
          this.invitationsSent.push(result.group);
        });
      });
    });

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

  acceptInvit(invitation: Group): void {
    this.groupService.acceptInvitation(invitation.group_id, this.userData.user.uuid).then(() => {
      this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
        this.userData = result;
      });
    });
  }

  declineInvit(group: Group): void {
    this.groupService.declineInvitation(group.group_id, group.invitations[this.invitationsSent.indexOf(group, 0)].uuid).then(() => {
      this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
        this.userData = result;
        this.userData.user.owned_groups.forEach(group => {
          this.groupService.getGroup(group.group_id).then((result: GroupDtoResponse) => {
            this.invitationsSent.splice(this.invitationsSent.indexOf(result.group, 0), 1);
          });
        });
      });
    });
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
      this.externalService.getOAuthGbooks().then((result: any) => {
        if (result.gbooks_url !== 'linked') {
          this.gbooksLinked = false;
        } else {
          this.gbooksLinked = true;
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
    this.externalService.getOAuthGbooks().then((result: any) => {
      if (result.gbooks_url !== 'linked') {
        window.location.href = result.gbooks_url;
      } else {
        this.gbooksLinked = true;
      }
    });
  }

  openAddGroupDialog(): void {
    const dialogRef = this.dialog.open(AddGroupComponent, { backdropClass: 'blur' });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
        this.userData = result;
      });
    });
  }

  openGroupManagementDialog(groupData: number, myGroup: boolean): void {
    const dialogRef = this.dialog.open(GroupManagementComponent, {
      data: { group: groupData, isMine: myGroup },
      id: 'add-group',
      width: '600px',
      autoFocus: false,
      backdropClass: 'blur'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
        this.userData = result;
      });
    });
  }

  openAddMemberDialog(userData: UserDtoResponse): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      data:  userData,
      autoFocus: false,
      backdropClass: 'blur'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userData.user.owned_groups.forEach(group => {
        this.groupService.getGroup(group.group_id).then((result: GroupDtoResponse) => {
          this.invitationsSent.push(result.group);
        });
      });
    });
  }

  exportData(): void {
    this.userService.exportUserData().then(data => {
      const blob = new Blob([JSON.stringify(data.user)], { type: 'application/json' });
      saveAs(blob, 'data.json');
    });
  }
}
