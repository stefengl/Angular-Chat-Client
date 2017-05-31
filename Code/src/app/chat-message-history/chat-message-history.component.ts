import { Room } from '../models/room';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-history',
  templateUrl: './chat-message-history.component.html',
  styleUrls: ['./chat-message-history.component.css']
})
export class ChatMessageHistoryComponent implements OnInit {

  @Input() activeRoom: Room = null;

  constructor() { }

  ngOnInit() {
  }

}
