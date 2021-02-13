import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {

  profile_uuid: string = '';
  message:string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.message = this.socketService.serverResponse.message;
  }

  startRecommendations() {
    this.socketService.startRecommendations(this.profile_uuid);
  }

}
