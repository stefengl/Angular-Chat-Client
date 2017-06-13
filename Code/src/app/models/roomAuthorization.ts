export class RoomAuthoritation {
  isOP : boolean;
  allowedToSpeak : boolean;

  constructor();

  constructor(isOP : boolean, allowedToSpeak : boolean);

  constructor(isOP?: boolean, allowedToSpeak?: boolean) {
    this.isOP = isOP;
    this.allowedToSpeak = allowedToSpeak;
  }
}
