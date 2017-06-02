import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  userNameSubject : Subject<string> = new Subject<string>()
  userNameObservable : Observable<string> = this.userNameSubject.asObservable()

  constructor(private websocket : WebsocketService) {}

  public authenticate(mail : string, password : string) : boolean{
    if (mail === '' || password === ''){
      return false
    }

    this.websocket.sendEvent( "Login", {
        password: password,
        email: mail
      })

    this.userNameSubject.next(mail)

    return true;
  }

  public changeUserPassword(mail: string, currentPw : string, newPw : string): boolean {
    this.websocket.sendEvent("ChangeUserPassword",
      {
          email: mail,
          oldPassword: currentPw,
          newPassword: newPw,
      })
    return true;
  }

  public rename(newUsername : string, email : string) : boolean {
    this.websocket.sendEvent( "RenameUser", {
      email: email,
      userName: newUsername
    });
    return true;
  }


  public logout() : boolean {

    this.userNameSubject.next('')

    this.websocket.sendEvent("Logout", {})
    return false

  }
}
