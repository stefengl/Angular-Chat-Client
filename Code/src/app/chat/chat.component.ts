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
  userName: string = ''
  activeRoom: Room = null


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

    this.auth.userNameObservable.subscribe( ( userName : string) => {
      this.userName = userName
      this.isLoggedIn = true
    })

  }

  onActiveRoomChanged(r: Room){
    
    console.log("Switched to " +r.name);
    
    this.activeRoom = r;
  }

}
