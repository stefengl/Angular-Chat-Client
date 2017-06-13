import {RoomAuthoritation} from "./roomAuthorization";
export class Subscriber
{
  name: string;
  email: string;
  roomAuthorization : RoomAuthoritation;

  constructor()

  constructor(name: string, email: string);

  constructor(name?: string, email?: string)
  {
    this.name = name;
    this.email = email;
    this.roomAuthorization = new RoomAuthoritation(false, false);
  }
}
