export class Room {
  name : string;
  active : boolean;

  constructor();

  constructor(name : string, active : boolean);

  constructor(name?: string, active?: boolean) {
    name = name || '';
    active = active || false;
  }
}