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

  @Output() roomLeaveEvent : EventEmitter<Room> = new EventEmitter<Room>()

  activeRoom: Room = null

  constructor(private websocket: WebsocketService) {}

  ngOnInit() {}

  joinRoomClicked(r : Room) {
    if(r.joined) {
      this.removeFromJoinedRooms(r)
    }
    else {
      this.addToJoinedRooms(r)
    }
  }

  addToJoinedRooms(room :Room){
    room.joined = true
    room.active = true
    this.websocket.sendEvent("JoinRoom",{roomName: room.name})
    this.roomJoinedEvent.emit(room);

  }

  removeFromJoinedRooms(room :Room){
    room.joined = false
    this.websocket.sendEvent("LeaveRoom", {roomName: room.name})
    this.roomLeaveEvent.emit(room)
  }

  onRoomClicked(room : any)
  {
    this.rooms.forEach(room =>
    {
      room.active = false;
    })

    if(this.activeRoom == null || this.activeRoom.name != room.name) {

      this.activeRoomEvent.emit(room)

    }

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
    new Room('Channel 1', false, false, [], []),
    new Room('Channel 2', false, false, [], []),
  ]
}
