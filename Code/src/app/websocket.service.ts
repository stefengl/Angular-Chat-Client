import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketService {

  private connection : WebSocket;

  constructor() {
    this.init()
  }

  init() {
    this.connection = new WebSocket('ws://localhost:8080/chatsocket/');
    
    let firstUser : boolean = true;
    
    const loginData = {
        name: "phe",
        password: "1234"
      },
      loginData2 = {
        name: "u1",
        password: "1234"
      };

    // When the connection is open, send login data to the server
    this.connection.onopen = function () {
      setInterval(() => {
        const event = {
          type: "Login",
          value: firstUser
            ? loginData
            : loginData2
        };
        firstUser = !firstUser;
        this.send(JSON.stringify(event));
        console.log("test")
      }, 10000);
    };

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

}
