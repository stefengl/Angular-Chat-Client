import { Component, OnInit } from '@angular/core';
import {Message} from "../models/message";


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

  constructor() { }

  ngOnInit() {
  }

}
