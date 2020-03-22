import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserOffer} from './UserOffer';
import {UserCoordinate} from './UserCoordinate';
import {ChatText} from './ChatText';

@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {
  private ownUserOffer: UserOffer = null;
  private basePath = 'https://einkaufr.herokuapp.com/api/v1/offers';

  constructor(
    private http: HttpClient
  ) {
  }

  getOwnOffer() {
    return this.ownUserOffer;
  }

  sendMessage(message: ChatText) {
    this.ownUserOffer.chatTexts.push(message);
    this.sendOffer(this.ownUserOffer);
  }

  setOwnOffer(ownOffer: UserOffer) {
    this.ownUserOffer = ownOffer;
  }

  getOffers(): Observable<UserOffer[]> {
    this.http.get<UserOffer>(`${this.basePath}`).subscribe(
      value => console.log(value)
    );
    return this.http.get<UserOffer[]>(`${this.basePath}`);
  }

  sendOffer(offer: UserOffer): Observable<any> {
    return this.http.post(`${this.basePath}`, offer);
  }

  sendTestOffer(): Observable<any> {
    const coordinate: UserCoordinate = {
      id: 3,
      longitude: 11234,
      latitude: 87654
    } as UserCoordinate;
    const message1: ChatText = {
      id: 0,
      sendDate: 'heute',
      chatText: 'Hi, ich komme um 18 Uhr vorbei',
      sendFromHelper: true
    };
    const message2: ChatText = {
      id: 0,
      sendDate: 'heute',
      chatText: 'Hallo, vielen Dank für deine Hilfe',
      sendFromHelper: false
    };
    const offerTest: UserOffer = {
      id: 0,
      timestamp: 0,
      userCoordinate: coordinate,
      offerStatus: `CLAIMED`,
      shoppingCart: [`Eier`, 'Mehl'],
      chatTexts: [message1, message2]
    } as UserOffer;
    return this.http.post(`${this.basePath}`, offerTest);

  }
}
