import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  serverResponse = {
    on: '',
    message: '',
    action: '',
    profile: {
      profile_name: '',
      uuid: ''
    }
  }

  private socket: Socket = io('http://127.0.0.1:4040/recommend', { transportOptions: {
    polling: {
      extraHeaders: {
        token: document.cookie ? document.cookie.split('; ').filter(cookie => cookie.startsWith('access_token'))[0].split('=')[1] : ''
      }
    }
  }});

  constructor() {
    if(this.socket.disconnected) {
      this.connect();
      this.waitServerResponse();
    }

    this.socket.on('connect_error', d => {
      this.serverResponse = d;
    });

  }
  
  startRecommendations(profile_uuid: string) {
    this.socket.emit('recommend', { profile_uuid: profile_uuid });
  }

  waitServerResponse() {
    this.socket.on('server_response', (data) => {
      this.serverResponse = data;
    });
  }

  connect(): void {
    this.socket.on('connect', (socket) => {
      this.socket.emit('join');
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

}
