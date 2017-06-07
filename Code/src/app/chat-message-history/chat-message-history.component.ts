import { AuthenticationService } from '../authentication.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../models/room';
import { Subscriber} from '../models/subscriber'
import {Message} from "../models/message";
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-chat-message-history',
  templateUrl: './chat-message-history.component.html',
  styleUrls: ['./chat-message-history.component.css']
})
export class ChatMessageHistoryComponent{

  @Input() activeRoom: Room = null
  @Input() username : string = ''

  textMessage : string = ''




  constructor(private websocket: WebsocketService, private auth: AuthenticationService) { }



  private sendMessage() {

    if(this.textMessage != ''){
      this.notifyServer()
      this.resetInputfield()
    }
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






}
