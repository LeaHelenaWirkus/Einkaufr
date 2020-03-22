import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OfferServiceService} from '../../offer-service.service';
import {UserOffer} from '../../UserOffer';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  selectedOffer: UserOffer;

  constructor(
    private router: Router,
    private offers: OfferServiceService
  ) {
  }

  ngOnInit(): void {
    this.selectedOffer = this.offers.getOwnOffer();
  }

  offerSolved() {
    this.router.navigate(['']);
  }
}
