import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  /**
   * TODO
   * authenticate against backend-server
   */
  public authenticate(username: string = '', password: string= '') : boolean{
    if (username === '' || password === ''){
      return false
    }

    return false;
  }
}
