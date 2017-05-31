import { WebsocketService } from '../websocket.service';
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

  constructor(private authenticator : AuthenticationService, private websocket: WebsocketService) { }


   private login(){
    this.isLoggedIn = this.authenticator.authenticate(this.username, this.pw)
   }

   private logout(){
     this.isLoggedIn = this.authenticator.logout()
   }

   private register(){
     let newUser = {
       email: this.username,
       name: this.username,
       password: this.pw
     }
     this.websocket.sendEvent("RegisterUser", newUser)

     alert("You've been registered!")
   }
}
