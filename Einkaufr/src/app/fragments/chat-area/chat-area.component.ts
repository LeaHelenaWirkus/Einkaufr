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
  claimed = false;
  chatTextTable: string[][];
  chatTexts: ChatText[] = [];
  @Input() isHelper = false;
  constructor(
    private offerService: OfferService
  ) {
  }

  ngOnInit(): void {
    this.chatTexts = this.offerService.getOwnOffer().chatTexts;
    this.claimed = this.offerService.getOwnOffer().offerStatus === 'CLAIMED';
    this.buildLists();
    this.messagesListener();
  }


  sendMessage() {
    if (this.chatTextValue !== '') {
      // send message
      const message = new ChatText();
      message.sendFromHelper = this.isHelper;
      message.chatText = this.chatTextValue;
      message.sendDate  = null;
      /*message.sendDate = new Date().getTime().toLocaleString();*/ /*todo build correct dateTime String*/
      this.chatTexts.push(message);
      this.buildLists();
      this.offerService.sendMessage(message);
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
      this.offerService.getOwnUserOfferUpdate().subscribe(updatedOffer => {
        console.log(updatedOffer.chatTexts.length);
        this.offerService.setOwnOffer(updatedOffer);
        this.chatTexts = updatedOffer.chatTexts;
        this.buildLists();
        this.messagesListener();
        if (updatedOffer.offerStatus === 'CLAIMED') {
          this.claimed = true;
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
