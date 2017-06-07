import { AuthenticationService } from '../authentication.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../models/room';
import { Subscriber} from '../models/subscriber'
import {Message} from "../models/message";
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-chat-message-history',
  templateUrl: './chat-message-history.component.html',
  styleUrls: ['./chat-message-history.component.css']
})
export class ChatMessageHistoryComponent implements OnInit {

  @Input() activeRoom: Room = null
  @Input() userName : string = ''

  textMessage : string = ''

  messages : Message[] = [];

  joinedRooms: Room[] = [];


  constructor(private websocket: WebsocketService, private auth: AuthenticationService) { }

  ngOnInit() {

    this.handleSubscriptions()

  }


  private sendMessage() {

    if(this.textMessage != ''){
      this.notifyServer()
      this.resetInputfield()
    }

  }

   addToMessages(){

      this.messages.push({
        isNotify: false,
        message: this.textMessage,
        username: this.userName,
        date: this.getCurrentDatetime()
      })

   }

   notifyServer() {

      const data = {
        roomName: this.activeRoom.name,
        message: this.textMessage
      }
      this.websocket.sendEvent("SendMessageToRoom", data)

   }


   resetInputfield() {

      this.textMessage = ''

   }


  getCurrentDatetime() : string{
    const d = new Date()
    const date = d.toLocaleDateString()
    const time = d.toLocaleTimeString()

    const currentDatetime = `${date} - ${time}`

    return currentDatetime
  }



  handleSubscriptions(){
    this.auth.userNameObservable.subscribe( (userName : string ) => {
      this.userName = userName;
    })

    this.websocket.MessageSendToRoom.subscribe( (value) => {

      const newMsg = {
        isNotify: false,
        message: value.message,
        username: value.email,
        date: this.getCurrentDatetime()
      }

      if(value.roomName == this.activeRoom.name){
        this.messages.push(newMsg)

      }
    })

    this.websocket.RoomJoined.subscribe( (value) => {
      if(value.email === this.userName)
      {
        this.joinedRooms.push(
          {
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
        );
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

          }
        })

      }
    })
  }


}
