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

  activeRoom: Room = null

  rooms : Room[] = [
    {
      name: 'Channel 1',
      active: false,
      subscribers:[
        {
        name: "Alex"
        }
      ]
    },
    {
      name: 'Channel 2',
      active: false,
      subscribers:[
        {
          name: "Benny"
        }
      ]
    },
    {
      name: 'Channel 3',
      active: false,
      subscribers:[
        {
          name: "Stefan"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
         {
          name: "Hier"
        },
         {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'TierChannel 5',
      active: false,
      subscribers:[
        {
          name: "Affe"
        },
        {
          name: "Esel"
        },
        {
          name: "Ziege"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },{
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },
    {
      name: 'Sebi stinkt Channel',
      active: false,
      subscribers:[
        {
          name: "Sebi stinkt"
        },
        {
          name: "Hier"
        },
        {
          name: "Ganz Allein"
        }
      ]
    },


  ]

  constructor(private websocket: WebsocketService) {}

  ngOnInit() {}

  onRoomClicked(room : any)
  {
    this.rooms.forEach(room =>
    {
      room.active = false;
    })

    if(this.activeRoom != null){
      this.leaveActiveRoom()
    }

    this.joinNewRoom(room)

  }


  private joinNewRoom(newRoom: Room) {
    newRoom.active = true;
    this.activeRoom = newRoom;
    this.activeRoomEvent.emit(newRoom)

    this.websocket.sendEvent("JoinRoom", {
      roomName: newRoom.name
    })
  }


  private leaveActiveRoom(){

     this.websocket.sendEvent("LeaveRoom", {
      roomName: this.activeRoom.name
    })

  }


}
