import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: String[] = [];

  add(messages: string){
    this.messages.push(messages);
  }

  clear(){
    this.messages = [];
  }

}
