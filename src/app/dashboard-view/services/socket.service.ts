import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket = io('http://localhost:4040' + '/recommend', { transportOptions: {
    polling: {
      extraHeaders: {
        token: document.cookie.split('; ').filter(cookie => cookie.startsWith('access_token'))[0].split('=')[1]
      }
    }
  }});


  constructor() {
      this.socket.on('connect', () => {
        this.socket.emit('join');
      });
      this.socket.on('server_response', (data) => {
        console.log(data);
      });
  }
  
  startRecommendations(profile_uuid: string) {
    this.socket.emit('recommend', {
      profile_uuid: profile_uuid
    });
    console.log('recommend')

  }

  disconnect() {
    this.socket.disconnect();
  }

}
