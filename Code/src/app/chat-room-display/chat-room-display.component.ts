import { WebsocketService } from '../websocket.service';
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

  @Output() roomJoinedEvent : EventEmitter<Room> = new EventEmitter<Room>()

  activeRoom: Room = null



  constructor(private websocket: WebsocketService) {}

  ngOnInit() {}

  joinRoomClicked(r : Room) {

  }

  addToJoinedRooms(room :Room){
    event.stopPropagation()

    this.roomJoinedEvent.emit(room);
  }

  removeFromJoinedRooms(room :Room){

  }

  onRoomClicked(room : any)
  {
    this.rooms.forEach(room =>
    {
      room.active = false;
    })



  }


  private joinNewRoom(newRoom: Room) {
    newRoom.active = true;
    this.activeRoom = newRoom;
    this.activeRoomEvent.emit(newRoom)

  }


  private leaveActiveRoom(){

     this.websocket.sendEvent("LeaveRoom", {
      roomName: this.activeRoom.name
    })

  }

  rooms : Room[] = [
    {
      name: 'Channel 1',
      active: false,
      joined: false,
      subscribers:[],
      messages:[],
    },
    {
      name: 'Channel 2',
      active: false,
      joined: false,
      subscribers:[],
      messages:[]
    }
  ]
}
