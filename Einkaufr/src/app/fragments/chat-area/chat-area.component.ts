import {Component, Input, OnInit} from '@angular/core';
import {ChatText} from '../../ChatText';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {

  chatTextValue = '';
  chatTextTable: string[][];
  @Input() chatTexts: ChatText[];
  @Input() isHelper = false;

  constructor() {
  }

  ngOnInit(): void {
    this.chatTexts = [ new ChatText(), new ChatText()];
    this.chatTexts.forEach( value => value.chatText = 'Hallo Welt');
    this.chatTexts[0].sendFromHelper = true;
    this.buildLists();
  }


  sendMessage() {
    if (this.chatTextValue !== undefined) {
      // send message
      console.log(this.chatTextValue);
    }
  }

  changeChatText(nextValue: string) {
    this.chatTextValue = nextValue;
    console.log(this.chatTextValue);
  }

  buildLists() {
    console.log('length: ' + this.chatTexts.length);
    if (this.chatTexts.length > 0) {
      this.chatTextTable = [];
      this.chatTextTable[0] = [];
      this.chatTextTable[1] = [];
      for (let i = 0; i < this.chatTexts.length; i++) {
        if (this.chatTexts[i].sendFromHelper) {
          if (this.isHelper) {
            this.chatTextTable[i][1] = this.buildChatTextString(this.chatTexts[i]);
          } else {
            this.chatTextTable[i][0] = this.buildChatTextString(this.chatTexts[i]);
          }
        } else {
          if (this.isHelper) {
            this.chatTextTable[i][0] = this.buildChatTextString(this.chatTexts[i]);
          } else {
            this.chatTextTable[i][1] = this.buildChatTextString(this.chatTexts[i]);
          }
        }
      }
    }
  }

  buildChatTextString(text: ChatText) {
    return text.chatText + ' (' + text.sendDate + ')';
  }

  /*fillTable(text: string, fromHelper: boolean) {
    if (this.isHelper) {
      if (fromHelper) {

      }
    }
  }*/

}
