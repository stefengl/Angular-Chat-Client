import { Observable, Subject } from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  connectionFailed : Subject<boolean> = new Subject<boolean>()
  connectionFailedObservable: Observable<boolean> = this.connectionFailed.asObservable()

  MessageSendToRoom : Subject<any> = new Subject<any>()
  MessageSendToRoomObservable: Observable<any> = this.connectionFailed.asObservable()

  private connection : WebSocket;

  constructor() {
    this.init()

  }

  init() {
    console.log("Verbindung zum WebSocket wird aufgebaut...");
    this.connection = new WebSocket('ws://localhost:8080/chatSocket/');

    // When the connection is open, send login data to the server
    this.connection.onopen = function () {
      console.log("WebSocket Verbindung ist geöffnet");
    };

    // Log errors
    this.connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    this.connection.onmessage = (e) => {
      var o = JSON.parse(e.data);

      if(o.type ===  "MessageSendToRoom"){
        this.MessageSendToRoom.next(o.value)
        console.log("geht")
      }

      console.log("Server", o);
    };
  }

  sendEvent(type: string, data: any): void {
    console.log("Event wird an den WebSocket gesendet:", type, data);
    const event = {
        type: type,
        value: data
    };

    this.connection.send(JSON.stringify(event));
 }
}
