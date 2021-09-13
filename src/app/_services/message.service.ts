import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
//Таблица, куда идут сообщения о том, что происходит в приложении
  //Tämä on loki kirja
  messages: string[] = [];

  add(message: string) {
    //добавляем информацию в таблицу
    this.messages.push(message);
  }
// очищаем таблицу
  clear() {
    this.messages = [];
  }
}
