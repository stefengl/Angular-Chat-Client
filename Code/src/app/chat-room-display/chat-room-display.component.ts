import {Component, OnInit,Output, EventEmitter} from '@angular/core';
import {Room} from '../models/room';
import {Subscriber} from "../models/Subscriber";

@Component({
      selector: 'app-chat-room-display',
      templateUrl: './chat-room-display.component.html',
      styleUrls: ['./chat-room-display.component.css']
  })

export class ChatRoomDisplayComponent implements OnInit {
  @Output() activeRoomEvent : EventEmitter<Room> = new EventEmitter<Room>()

  rooms: Room[] = [
    {
      name: 'Channel 1',
      active: false,
      subscribers:[
        {
        name: "Alex"
        }
      ]
    },
    {
      name: 'Channel 2',
      active: false,
      subscribers:[
        {
          name: "Benny"
        }
      ]
    },
    {
      name: 'Channel 3',
      active: false,
      subscribers:[
        {
          name: "Stefan"
        }
      ]
    }
  ]

  constructor() {}

  ngOnInit() {}

  onClicked(room : any)
  {
    this.rooms.forEach(room =>
    {

      room.active = false;
    })

    room.active = true;

    this.activeRoomEvent.emit(room)
  }
}
