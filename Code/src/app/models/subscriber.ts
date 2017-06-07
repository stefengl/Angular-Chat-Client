export class Subscriber
{
  name: string;
  email: string;

  constructor()

  constructor(name: string, email: string);

  constructor(name?: string, email?: string)
  {
    this.name = name;
    this.email = email;
  }
}
