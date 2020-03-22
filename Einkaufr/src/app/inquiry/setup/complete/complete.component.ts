import { Component, OnInit } from '@angular/core';
import {UserCoordinate} from '../../../UserCoordinate';
import {UserOffer} from '../../../UserOffer';
import {SetupSharedDataService} from '../../setup-shared-data.service';
import {OfferServiceService} from '../../../offer-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  constructor(
    private data: SetupSharedDataService,
    private offerService: OfferServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const coordinate: UserCoordinate = {
      id: 0,
      longitude: this.data.selectedLocation.longitude,
      latitude: this.data.selectedLocation.latitude
    } as UserCoordinate;
    const offer: UserOffer = {
      id: 0,
      title: '',
      timestamp: 0,
      userCoordinate: coordinate,
      offerStatus: `UNCLAIMED`,
      shoppingCart: this.data.shoppingList
    } as UserOffer;
    this.offerService.sendOffer(offer).subscribe(
      value => console.log(value)
    );
    this.offerService.getOffers().subscribe(
      value => console.log(value)
    );

  }

  offerSolved() {
    this.router.navigate(['']);
  }

}
