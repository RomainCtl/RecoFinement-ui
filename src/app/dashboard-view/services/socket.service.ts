import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  serverResponse = {
    message: ''
  }

  private socket: Socket = io('http://127.0.0.1:4040/recommend', { transportOptions: {
    polling: {
      extraHeaders: {
        token: document.cookie.split('; ').filter(cookie => cookie.startsWith('access_token'))[0].split('=')[1]
      }
    }
  }});

  constructor() {
    this.connect();
    this.waitServerResponse();
    this.socket.on('connect_error', d => {
      this.serverResponse.message = d;
    });
  }
  
  startRecommendations(profile_uuid: string) {
    this.socket.emit('recommend', { profile_uuid: profile_uuid });
    console.log('recommend')
  }

  waitServerResponse() {
    this.socket.on('server_response', (data) => {
      console.log(data)
      this.serverResponse = data;
    });
  }

  connect(): void {
    this.socket.on('connect', (socket) => {
      console.log(socket);
      this.socket.emit('join');
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

}
