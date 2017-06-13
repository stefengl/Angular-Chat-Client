import {Subscriber} from "../models/Subscriber";
import {Message} from "../models/message";
import {RoomAuthoritation} from "./roomAuthorization";

export class Room {
  name : string;
  active : boolean;
  joined : boolean
  subscribers: Subscriber[];
  messages : Message[];
  ownAuthorization : RoomAuthoritation;

  constructor();

  constructor(name : string, active : boolean, joined : boolean, subscriber: Subscriber[], messages: Message[]);

  constructor(name?: string, active?: boolean, joined?: boolean, subscribers?: Subscriber[], messages?: Message[]) {
    this.name = name || '';
    this.active = active || false;
    this.joined = active || false;
    this.subscribers = subscribers || null;
    this.messages = messages || null;
    this.ownAuthorization = new RoomAuthoritation(false, false);
  }
}
