export class Message {
  isNotify : boolean;
  message : string;
  username : string;
  date : string;

  constructor();

  constructor(isNotify : boolean, msg : string, name : string, date: string);

  constructor(isNotify?: boolean, msg?: string, name?: string, date?: string) {
    this.isNotify = isNotify;
    this.username = name || '';
    this.message = msg  || '';
    this.date = date || '';
  }
}
