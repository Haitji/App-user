import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SharingData {


  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  private  _userIdEventEmitter = new EventEmitter();
  private _selectUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(){

  }

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }
  get userIdEventEmitter(): EventEmitter<number>{
    return this._userIdEventEmitter;
  }
  get selectUserEventEmitter(): EventEmitter<User>{
    return this._selectUserEventEmitter;
  }
}
