import { AuthenticationService } from '../authentication.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../models/room';
import { Subscriber } from '../models/subscriber'
import { Message } from "../models/message";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isLoggedIn : boolean = false
  userName: string = ''
  activeRoom: Room = null;
  joinedRooms: Room[] = [];

  constructor(private websocket: WebsocketService, private auth: AuthenticationService) { }

  ngOnInit() {

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

  getCurrentDatetime() : string{
    const d = new Date()
    const date = d.toLocaleDateString()
    const time = d.toLocaleTimeString()

    const currentDatetime = `${date} - ${time}`

    return currentDatetime
  }

  onActiveRoomChanged(r: Room){

    console.log("Switched to " +r.name);

    this.activeRoom = r;
  }

  onRoomJoined(room: Room){
    console.log(room);
    this.joinedRooms.push(room);

    this.activeRoom = room;
  }

  handleSubscriptions(){
    this.websocket.MessageSendToRoom.subscribe( (value) => {
      this.joinedRooms.forEach(room => {
        if(room.name === value.roomName){
          room.messages.push(new Message(false, value.message, value.email, this.getCurrentDatetime()));
          if(room.name === this.activeRoom.name){
            this.activeRoom = room;
          }
        }
      })

      /*
      const newMsg = {
        isNotify: false,
        message: value.message,
        username: value.email,
        date: this.getCurrentDatetime()
      }

      if(value.roomName == this.activeRoom.name){
        this.messages.push(newMsg)

      }
        */
    })

    this.websocket.RoomJoined.subscribe( (value) => {
      if(value.email === this.userName)
      {
        let newRoom = {
          name: value.roomName,
          active: false,
          subscribers: [],
          messages : [{
            isNotify: true,
            message: "Du hast den Raum betreten",
            username: "",
            date: this.getCurrentDatetime()
          }]
        }

        this.joinedRooms.push(newRoom);
        this.activeRoom = newRoom;
      }
      else{
        this.joinedRooms.forEach(room => {
          if(room.name === value.roomName){
            room.subscribers.push(
              new Subscriber(value.name, value.email)
            );

            let notifyMessage = value.name + ' hat den Raum betreten';

            room.messages.push(
              new Message(true, notifyMessage, "", this.getCurrentDatetime())
            );
            if(room.name === this.activeRoom.name){
              this.activeRoom = room;
            }
          }
        })

      }
    })

  }

}
