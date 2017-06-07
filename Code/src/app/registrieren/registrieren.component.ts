import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {

  registerEmail : string = ''
  registerPw : string = ''
  registerUsername: string = ''
  constructor(private websocket: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  private register(){
    let newUser = {
      email: this.registerEmail,
      name: this.registerUsername,
      password: this.registerPw
    }
    this.websocket.sendEvent("RegisterUser", newUser)

    alert("You've been registered!")
    this.router.navigate(['login']);
  }

}
