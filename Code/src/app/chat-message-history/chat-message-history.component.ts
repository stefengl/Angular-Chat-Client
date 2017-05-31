import { Room } from '../models/room';
/*import {Message} from "../models/message";*/
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-chat-message-history',
  templateUrl: './chat-message-history.component.html',
  styleUrls: ['./chat-message-history.component.css']
})
export class ChatMessageHistoryComponent implements OnInit {
  user : string = "Benjamin";
  messages : any[] = [
    {
      message: "Benny ist so cool",
      username: "Alex Tarasov",
      date: "31.05.2017 - 12:05"
    },
    {
      message: "Schinken",
      username: "Stefan",
      date: "31.05.2017 - 12:06"
    },
    {
      message: "Sebi stinkt",
      username: "Benjamin",
      date: "31.05.2017 - 12:07"
    }
  ];

  @Input() activeRoom: Room = null;

  constructor() { }

  ngOnInit() {
  }

}
