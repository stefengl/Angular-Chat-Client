export class Message {
  isNotify : boolean;
  message : string;
  email : string;
  date : string;

  constructor();

  constructor(isNotify : boolean, msg : string, mail : string, date: string);

  constructor(isNotify?: boolean, msg?: string, mail?: string, date?: string) {
    this.isNotify = isNotify;
    this.email = mail || '';
    this.message = msg  || '';
    this.date = date || '';
  }
}
