import {Component, Input, OnInit} from '@angular/core';
import {ChatText} from '../../ChatText';
import {OfferService} from '../../services/offer.service';

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
  @Input() useChat = false;

  constructor(
    private offers: OfferService
  ) {
  }

  ngOnInit(): void {
    this.buildLists();
    this.messagesListener();
  }


  sendMessage() {
    if (this.chatTextValue !== '') {
      // send message
      const message = new ChatText();
      message.sendFromHelper = this.isHelper;
      message.chatText = this.chatTextValue;
      /*message.sendDate = new Date().getTime().toLocaleString();*/
      this.offers.sendMessage(message);
      this.chatTextValue = ''; /*todo clear always*/
    }
  }

  changeChatText(nextValue: string) {
    this.chatTextValue = nextValue;
  }

  buildLists() {
    if (this.chatTexts.length > 0) {
      this.chatTextTable = [];
      for (let i = 0; i < this.chatTexts.length; i++) {
        this.chatTextTable.push([]);
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
    return text.sendDate !== null ? text.chatText + ' (' + text.sendDate + ')' : text.chatText;
  }

  messagesListener() {
    this.waitSeconds(5).then(() => {
      this.offers.getOwnUserOfferUpdate().subscribe(updatedOffer => {
        console.log(updatedOffer.chatTexts.length);
        this.offers.setOwnOffer(updatedOffer);
        this.chatTexts = updatedOffer.chatTexts;
        this.buildLists();
        this.messagesListener();
        if (this.chatTexts.length > 0) {
          this.useChat = true;
        }
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
