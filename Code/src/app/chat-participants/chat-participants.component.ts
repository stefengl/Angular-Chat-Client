import { Room } from '../models/room';
import { Component, OnInit, Input } from '@angular/core';
import {Subscriber} from "../models/Subscriber";

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.css']
})
export class ChatParticipantsComponent implements OnInit {

  @Input() activeRoom : Room = null 
  subscriber: Subscriber[] =
  [
    {
      name: 'Alex'
    },
    {
      name: 'Benny'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
