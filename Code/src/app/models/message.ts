export class Message {
  message : string;
  username : string;
  date : string;

  constructor();

  constructor(msg : string, name : string, date: string);

  constructor(msg?: string, name?: string, date?: string) {
    this.username = name || '';
    this.message = msg  || '';
    this.date = date || '';
  }
}
