import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserOffer} from './UserOffer';

@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {
  private userOffer: UserOffer = null;
  private basePath = 'https://einkaufr.herokuapp.com/api/v1/offers';

  constructor(
    private http: HttpClient
  ) { }

  getOwnOffer() {
    return this.userOffer;
  }

  setOwnOffer(ownOffer: UserOffer) {
    this.userOffer = ownOffer;
  }

  getOffers(): Observable<UserOffer> {
    this.http.get<UserOffer>(`${this.basePath}`).subscribe(
      value => console.log(value)
    );
    return this.http.get<UserOffer>(`${this.basePath}`);
  }

  sendOffer(offer: UserOffer): Observable<any> {
    /*const coordinate: UserCoordinate = <UserCoordinate> {
      id: 3,
      longitude: 11234,
      latitude: 87654
    };
    const offertest: UserOffer = <UserOffer>{
      id: 0,
      timestamp: 0,
      userCoordinate: coordinate,
      offerStatus: `CLAIMED`,
      shoppingCart: [`String`]
    };*/
    return this.http.post(`${this.basePath}`, offer);
  }


}
