import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserOffer} from './UserOffer';
import {Angebot} from './helper/overview/Angebot';


@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {
  private angebot: Angebot = null;
  private basePath = 'https://einkaufr.herokuapp.com/api/v1/offers';

  constructor(
    private http: HttpClient
  ) { }

  getOwnOffer() {
    return this.angebot;
  }

  setOwnOffer(ownOffer: Angebot) {
    this.angebot = ownOffer;
  }

  getOffers(): Observable<UserOffer> {
    return this.http.get<UserOffer>(`${this.basePath}`);
  }

  sendOffer(): Observable<any> {
    const offer: UserOffer = new UserOffer(3, 45670, '12345, 678910', 'offen', ['Eier', 'mehl']);
    return this.http.post(`${this.basePath}`, offer);
  }


}
