import { AuthenticationService } from '../authentication.service';
import { Room } from '../models/room';
import { Component, OnInit } from '@angular/core';
import {MdGridListModule} from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isLoggedIn : boolean = true;
  userName: string = '';
  activeRoom: Room = null;
  windowHeight: any;


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.windowHeight = ((window.innerHeight)-100) + 'px';

    this.auth.userNameObservable.subscribe( ( userName : string) => {
      if (userName != ''){
        this.userName = userName
        this.isLoggedIn = true
      }
      else {
        this.isLoggedIn = false
      }
    })

  }

  getWindowHeight(){
    return ((window.innerHeight)-140) + 'px';
  }
  onActiveRoomChanged(r: Room){

    console.log("Switched to " +r.name);

    this.activeRoom = r;
  }

}
