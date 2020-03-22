import {Component, OnInit} from '@angular/core';
import {Angebot} from '../overview/Angebot';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {OfferServiceService} from '../../offer-service.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  selectedAngebot: Angebot;

  constructor(
    private router: Router,
    private offers: OfferServiceService
  ) {
  }

  ngOnInit(): void {
    this.selectedAngebot = this.offers.getOwnOffer();
  }

  offerSolved() {
    this.router.navigate(['']);
  }

}
