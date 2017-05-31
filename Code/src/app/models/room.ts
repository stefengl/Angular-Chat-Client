import {Subscriber} from "../models/Subscriber";

export class Room {
  name : string;
  active : boolean;
  subscribers: Subscriber[];

  constructor();

  constructor(name : string, active : boolean, subscriber: Subscriber);

  constructor(name?: string, active?: boolean, subscribers?: Subscriber) {
    name = name || '';
    active = active || false;
    subscribers = subscribers || null;
  }
}
