import { Component, OnInit } from '@angular/core';
import {UserCoordinate} from "../../../UserCoordinate";
import {UserOffer} from "../../../UserOffer";
import {SetupSharedDataService} from "../../setup-shared-data.service";
import {OfferServiceService} from "../../../offer-service.service";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  constructor(
    private data: SetupSharedDataService,
    private offerService: OfferServiceService
  ) { }

  ngOnInit(): void {
    const coordinate: UserCoordinate = <UserCoordinate> {
      id: 0,
      longitude: this.data.selectedLocation.longitude,
      latitude: this.data.selectedLocation.latitude
    };
    const offer: UserOffer = <UserOffer>{
      id: 0,
      title: "",
      timestamp: 0,
      userCoordinate: coordinate,
      offerStatus: `UNCLAIMED`,
      shoppingCart: this.data.shoppingList
    };
    this.offerService.sendOffer(offer).subscribe(
      value => console.log(value)
    );
    this.offerService.getOffers().subscribe(
      value => console.log(value)
    )

  }

}
