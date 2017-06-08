import { AuthenticationService } from '../authentication.service';
import { WebsocketService } from '../websocket.service';
import { Room } from '../models/room';
import { Subscriber } from '../models/subscriber'
import { Message } from "../models/message";
import { Component, OnInit } from '@angular/core';
import {MdGridListModule} from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  email: string = ''
  username: string = ''
  isLoggedIn : boolean = false
  windowHeight: any;

  joinedRooms: Room[] = [];
  activeRoom: Room = null


  constructor(private websocket: WebsocketService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.windowHeight = ((window.innerHeight)-100) + 'px';
    this.handleSubscriptions()

  }

  getCurrentDatetime() : string{
    const d = new Date()
    const date = d.toLocaleDateString()
    const time = d.toLocaleTimeString()

    const currentDatetime = `${date} - ${time}`

    return currentDatetime
  }

  getWindowHeight(){
    return ((window.innerHeight)-140) + 'px';
  }
  onActiveRoomChanged(r: Room){

    this.activeRoom = r;
  }

  onRoomJoined(room: Room){
    room.messages.push(
      new Message(true, "Du hast den Raum betreten", "", this.getCurrentDatetime())
    )
    this.joinedRooms.push(room);
    this.activeRoom = room;
  }

  onRoomLeft(room: Room) {
    this.joinedRooms = this.joinedRooms.filter(joinedRoom => joinedRoom.name !== room.name)
  }

  handleSubscriptions(){

    this.auth.loginDescriptionObservable.subscribe( ( loginDescription ) => {
      this.email = loginDescription.email
      this.username = loginDescription.username
      this.isLoggedIn = loginDescription.isLoggedIn
    })


    this.websocket.messageSendToRoom.subscribe( (value) => {
      this.joinedRooms.forEach(room => {
        if(room.name === value.roomName){
          room.messages.push(new Message(false, value.message, value.email, this.getCurrentDatetime()));
          if(room.name === this.activeRoom.name){ this.activeRoom = room; }
        }
      })
    })

    this.websocket.roomLeft.subscribe( (value) => {
        if(value.email !== this.email){
          this.joinedRooms.forEach(room => {
            if(room.name === value.roomName){
              room.subscribers = room.subscribers.filter(subscriber => subscriber.email !== value.email)
              room.messages.push(
                new Message(true,value.email + " hat den Raum verlassen","",this.getCurrentDatetime())
              )
            }
          })
        }
    })

    this.websocket.roomJoined.subscribe( (value) => {
      if(value.email !== this.email){

        this.joinedRooms.forEach(room => {
          if(room.name === value.roomName)
          {
            room.subscribers.push( new Subscriber(value.name, value.email) );

            room.messages.push(
              new Message(true, value.email + ' hat den Raum betreten', "", this.getCurrentDatetime())
            );

            if(room.name === this.activeRoom.name){ this.activeRoom = room; }
          }
        })

      }
    })

  }
}
