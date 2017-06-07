import { WebsocketService } from '../websocket.service';
import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggedIn : boolean = false
  loginEmail : string = ''
  loginPw : string = ''

  registerEmail : string = ''
  registerPw : string = ''
  registerUsername: string = ''

  newUsername: string = ''
  currentPassword: string = ''
  newPassword: string = ''


  constructor(private authenticator : AuthenticationService, private websocket: WebsocketService, private router: Router) {
    console.log("Login Component wird initialisiert.")
  }


   private login(){
    this.router.navigate(['/chat']);
    this.isLoggedIn = this.authenticator.authenticate(this.loginEmail, this.loginPw);

   }

   private logout(){
     this.isLoggedIn = this.authenticator.logout()
   }

   private rename(){
     this.authenticator.rename(this.newUsername, this.loginEmail);
   }

   private changePassword(){
    this.authenticator.changeUserPassword(this.loginEmail, this.currentPassword, this.newPassword);
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
