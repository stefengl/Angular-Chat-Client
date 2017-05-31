import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor(private websocket: WebsocketService) { }

  /**
   * TODO
   * authenticate against backend-server
   */
  public authenticate(username: string = '', password: string= '') : boolean{
    if (username === '' || password === ''){
      return false
    }

    this.websocket.sendEvent( "Login", {
        password: password,
        email: username
      })

      return true;
  }


  public logout() : boolean {
    this.websocket.sendEvent("Logout", {})
    return false

  }
}
