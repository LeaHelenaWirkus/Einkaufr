import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserOffer} from '../../UserOffer';
import {OfferService} from '../../services/offer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private offers: OfferService
  ) {}

  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: UserOffer[] = [];
  private output: string;

  ngOnInit(): void {
    this.offers.getOffers().subscribe(
      value => {
        this.items = value;
      }
    );
    /*this.offers.sendTestOffer().subscribe(
      value => console.log(value)
    );*/
  }

  takeOffer(item: UserOffer) {
    item.offerStatus = 'CLAIMED';
    this.offers.setOwnOffer(item);
    this.router.navigate(['helper/delivery']);
  }

  returnShoppingCart(shoppingCart: string[]) {
    this.output = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < shoppingCart.length; i++) {
      this.output += shoppingCart[i] + ', ';
    }
    return this.output;
  }
}
