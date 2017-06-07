import { AuthenticationService } from '../authentication.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../models/room';
import {Message} from "../models/message";
import { Component, OnInit, Input } from '@angular/core';
import {MdGridListModule} from '@angular/material';


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
        message: value.message,
        username: value.email,
        date: this.getCurrentDatetime()
      }

      if(value.roomName == this.activeRoom.name){
        this.messages.push(newMsg)

      }
    })
  }


}
