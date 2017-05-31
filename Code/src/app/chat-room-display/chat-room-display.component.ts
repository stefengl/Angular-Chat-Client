import {Component, OnInit,Output, EventEmitter} from '@angular/core';
import {Room} from '../models/room';

@Component({
      selector: 'app-chat-room-display',
      templateUrl: './chat-room-display.component.html', 
      styleUrls: ['./chat-room-display.component.css']
  })

export class ChatRoomDisplayComponent implements OnInit {

  @Output() activeRoomEvent : EventEmitter<Room> = new EventEmitter<Room>()

  rooms : Room[] = [
    {
      name: "Channel 1",
      active: false
    }, {
      name: "Channel 2",
      active: false
    }, {
      name: "Channel 3",
      active: false
    }, {
      name: "Channel 4",
      active: false
    }, {
      name: "Channel 5",
      active: false
    }
  ]

  constructor() {}

  ngOnInit() {}

  roomSelected(room: any){
    this.rooms.forEach( room => {
      room.active = false;
    })

    room.active = true;

    this.activeRoomEvent.emit(room)
  }
}
