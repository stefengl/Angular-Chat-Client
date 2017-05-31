import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggedIn : boolean = false
  username: string = ''
  pw : string = ''

  /**
   * TODO
   * Inject Authenticationservice
   */
  constructor(private authenticator : AuthenticationService) { }


  /**
   * TODO
   * Use Authenticationservice to call backend
   */
   private login(){

    console.log(`Authenticating with --> User: ${this.username} and PW: ${this.pw}`)

    this.isLoggedIn = this.authenticator.authenticate(this.username, this.pw)
   }
}
