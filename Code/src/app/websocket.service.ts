import { Observable, Subject } from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  connectionFailed : Subject<boolean> = new Subject<boolean>()
  connectionFailedObservable: Observable<boolean> = this.connectionFailed.asObservable()

  private connection : WebSocket;

  constructor() {
    this.init()

  }

  init() {
    this.connection = new WebSocket('ws://localhost:8080/chatSocket/');

    // When the connection is open, send login data to the server
    this.connection.onopen = function () {};



    // Log errors
    this.connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    this.connection.onmessage = function (e) {
      var o = JSON.parse(e.data);

      console.log("Server", o);
    };
  }

  sendEvent(type: string, data: any): void {
    const event = {
        type: type,
        value: data
    };

    this.connection.send(JSON.stringify(event));
 }
}
