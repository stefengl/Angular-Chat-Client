import { Component, OnInit, Input } from '@angular/core';
import {Subscriber} from "../models/subscriber";
import { Room } from '../models/room';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.css']
})
export class ChatParticipantsComponent implements OnInit {

  @Input() activeRoom: Room = null;

  subscriber: Subscriber[] =
  [
    new Subscriber('Alex', ''),
    new Subscriber('Benny', '')
  ]
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.activeRoom)
  }

}
