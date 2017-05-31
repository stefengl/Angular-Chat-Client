import { AuthenticationService } from '../authentication.service';
import {Component, OnInit} from '@angular/core';

@Component({selector: 'app-greeting', templateUrl: './greeting.component.html', styleUrls: ['./greeting.component.css']})
export class GreetingComponent implements OnInit {

  username : string = ''
  time : string = ''

  constructor(private auth : AuthenticationService) {}

  ngOnInit() {
    this.setupClock()
    this.handleSubscriptions()
  }


  private handleSubscriptions() {
    this.auth.userNameObservable.subscribe((userName : string ) => {
      this.username = userName
    })
  }

  private setupClock() : void {

    setInterval(() => {
      const date = new Date()
      const d = date.toLocaleDateString()
      const t = date.toLocaleTimeString()

      this.time = `${d} ${t} Uhr`
    }, 1000)

  }

}
