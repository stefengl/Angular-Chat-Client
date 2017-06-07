import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  /**
   * JSON
   * email
   * username
   * isLoggedIn
   */
  loginDescription : Subject<any> = new Subject<any>()
  loginDescriptionObservable : Observable<any> = this.loginDescription.asObservable()


  constructor(private websocket : WebsocketService) {

    this.handleSubscriptions()

  }

  private handleSubscriptions() {

    this.websocket.loginFailedObservable.subscribe( ( data ) => {

      const loginDesc = {
        email: '',
        username: '',
        isLoggedIn: data
      }

      this.loginDescription.next(loginDesc)

    })

    this.websocket.loginSuccessObservable.subscribe(( data ) => {

      const loginDesc = {
        email: data.email,
        username: data.name,
        isLoggedIn: true
      }      

      this.loginDescription.next(loginDesc)
    })

    this.websocket.logoutObservable.subscribe( ( data ) => {

      const loginDesc = {
        email: data.email,
        isLoggedIn: false
      }

      this.loginDescription.next(loginDesc)
    })
  }

  
  
  public authenticate(mail : string, password : string) {
    if (mail === '' || password === ''){
      return
    }

    this.websocket.sendEvent( "Login", {
        password: password,
        email: mail
      })
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

    this.websocket.sendEvent("Logout", {})
    return false

  }
}
