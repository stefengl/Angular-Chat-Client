import { Observable, Subject } from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  loginFailed : Subject<boolean> = new Subject<boolean>()
  loginFailedObservable: Observable<boolean> = this.loginFailed.asObservable()

  loginSuccess : Subject<any> = new Subject<any>()
  loginSuccessObservable: Observable<any> = this.loginSuccess.asObservable()

  logout : Subject<any> = new Subject<any>()
  logoutObservable: Observable<any> = this.logout.asObservable()

  MessageSendToRoom : Subject<any> = new Subject<any>()
  MessageSendToRoomObservable: Observable<any> = this.MessageSendToRoom.asObservable()

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

    // Handler server events
    this.connection.onmessage = (e) => {
      var o = JSON.parse(e.data);
      console.log("Server", o);
      
      switch (o.type) {
        case "MessageSendToRoom":
          this.MessageSendToRoom.next(o.value)
          break;

        case "LoggedIn": 
          this.loginSuccess.next({
            email: o.value.email,
            name: o.value.name
          })
          break;

        case "LoggedOut": 
          this.logout.next({
            email: o.value.email
          })
          break;

        case "LoginFailed": 
          this.loginFailed.next(false)
          break;

        default:
          break;
      }
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
