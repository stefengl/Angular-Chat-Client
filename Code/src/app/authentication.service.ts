import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  
  userNameSubject : Subject<string> = new Subject<string>()
  userNameObservable : Observable<string> = this.userNameSubject.asObservable()

  constructor(private websocket : WebsocketService) {}

  public authenticate(username: string = '', password: string= '') : boolean{
    if (username === '' || password === ''){
      return false
    }

    this.websocket.sendEvent( "Login", {
        password: password,
        email: username
      })
    
    this.userNameSubject.next(username)

    return true;
  }


  public logout() : boolean {

    this.userNameSubject.next('')

    this.websocket.sendEvent("Logout", {})
    return false

  }
}
