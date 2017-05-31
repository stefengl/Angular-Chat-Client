import { Room } from '../models/room';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  activeRoom: Room = null; 

  constructor() { }

  ngOnInit() {
  }

  onActiveRoomChanged(r: Room){
    
    console.log("Switched to " +r.name);
    
    this.activeRoom = r;
  }

}
