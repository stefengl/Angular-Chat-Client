import { WebsocketService } from '../websocket.service';
import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';

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


  constructor(private auth : AuthenticationService, private websocket: WebsocketService) {
    console.log("Login Component wird initialisiert.")
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
    this.auth.authenticate(this.loginEmail, this.loginPw)
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
