import {Component, OnInit} from '@angular/core';

@Component({selector: 'app-greeting', templateUrl: './greeting.component.html', styleUrls: ['./greeting.component.css']})
export class GreetingComponent implements OnInit {

  username : string = "Stefan Englmeier"
  time : string = ''

  constructor() {}

  ngOnInit() {
    this.getUsername()
    this.setupClock()
  }

  private getUsername() : void {}

  private setupClock() : void {

    setInterval(() => {
      const date = new Date()
      const d = date.toLocaleDateString()
      const t = date.toLocaleTimeString()

      this.time = `${d} ${t} Uhr`
    }, 1000)

  }

}
