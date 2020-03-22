import {Component, Input, OnInit} from '@angular/core';
import {ChatText} from '../../ChatText';
import {OfferServiceService} from '../../offer-service.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {

  chatTextValue = '';
  chatTextTable: string[][];
  @Input() chatTexts: ChatText[] = [];
  @Input() isHelper = false;
  @Input() useChat = true;

  constructor(
    private offers: OfferServiceService
  ) {
  }

  ngOnInit(): void {
    this.buildLists();
  }


  sendMessage() {
    if (this.chatTextValue !== undefined) {
      // send message
      const message = new ChatText();
      message.sendFromHelper = this.isHelper;
      message.chatText = this.chatTextValue;
      message.sendDate = new Date().getTime().toLocaleString();
      this.offers.sendMessage(message);
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

  messagesListener() {
    this.waitSeconds(10).then(value => {
      this.offers.getOwnUserOfferUpdate().subscribe(updatedOffer => {
        this.offers.setOwnOffer(updatedOffer);
        this.chatTexts = updatedOffer.chatTexts;
        this.buildLists();
        this.messagesListener();
      });
    });
  }

  waitSeconds(sec: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('');
      }, 1000 * sec);
    });
  }

}
