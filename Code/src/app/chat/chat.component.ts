import { AuthenticationService } from '../authentication.service';
import { Room } from '../models/room';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isLoggedIn : boolean = false
  email: string = ''
  username: string = ''
  activeRoom: Room = null


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

    this.auth.loginDescriptionObservable.subscribe( ( loginDescription ) => {
      this.email = loginDescription.email
      this.username = loginDescription.username
      this.isLoggedIn = loginDescription.isLoggedIn
    })

  }

  onActiveRoomChanged(r: Room){
    
    console.log("Switched to " +r.name);
    
    this.activeRoom = r;
  }

}
