import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserId(): string {
    const localStorage = Window.prototype.localStorage;
    const userToken = localStorage.getItem('Einkaufr');
    if (userToken) {
      return userToken;
    } else {
      const token = uuidv4();
      localStorage.setItem('Einkaufr', `${token}`);
      return token;
    }
  }
}
