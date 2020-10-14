import { ProfileService } from './../../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  private myGroup;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    // this.profileService.getGroup(1);
    // this.profileService.addGroup({name: 'dfez'});
    // this.profileService.deleteGroup(2);

    // this.profileService.inviteMember({uuid: '18a3b437-ba01-48e8-a24e-5116c315c089'}, 1);
    // this.profileService.acceptInvitation(1, '18a3b437-ba01-48e8-a24e-5116c315c089');
    // this.profileService.deleteInvitation(1, '18a3b437-ba01-48e8-a24e-5116c315c089');
  }

  createGroup(value: any) {
    console.log(value);
    this.profileService.addGroup({name: 'input'});
  }

}
