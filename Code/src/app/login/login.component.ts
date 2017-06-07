import { WebsocketService } from '../websocket.service';
import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn : boolean = false
  loginEmail : string = ''
  loginPw : string = ''

  registerEmail : string = ''
  registerPw : string = ''
  registerUsername: string = ''

  newUsername: string = ''
  currentPassword: string = ''
  newPassword: string = ''



  constructor(private auth : AuthenticationService, private websocket: WebsocketService, private router: Router) {

  }


  ngOnInit () {
    this.handleSubscriptions()
  }


  private handleSubscriptions() {
    this.auth.loginDescriptionObservable.subscribe( ( loginDescription ) => {
      this.isLoggedIn = loginDescription.isLoggedIn
    })
  }


  private login(){
    this.auth.authenticate(this.loginEmail, this.loginPw);
    this.router.navigate(['/chat']);
  }


  private logout(){
    this.isLoggedIn = this.auth.logout()
  }


  private rename(){
    this.auth.rename(this.newUsername, this.loginEmail);
  }


  private changePassword(){
  this.auth.changeUserPassword(this.loginEmail, this.currentPassword, this.newPassword);
  }


  private register(){
    let newUser = {
      email: this.registerEmail,
      name: this.registerUsername,
      password: this.registerPw
    }
    this.websocket.sendEvent("RegisterUser", newUser)

    alert("You've been registered!")
  }
}
