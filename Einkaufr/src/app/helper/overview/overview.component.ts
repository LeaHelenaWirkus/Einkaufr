import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserOffer} from '../../UserOffer';
import {OfferServiceService} from '../../offer-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  selectedOffer: UserOffer = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private offers: OfferServiceService
  ) {}

  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: UserOffer[];
  private output: string;

  ngOnInit(): void {
    this.offers.getOffers().subscribe(
      value => {
        console.log('Value for item ' + value[0].id);
        this.items = value;
        console.log('Items after push' + this.items[0].id);
      }
    );
    this.offers.sendTestOffer().subscribe(
      value => console.log(value)
    );
    console.log('Items: ' + this.items);

  }


  takeOffer(item: UserOffer) {
    this.selectedOffer = item;
    this.offers.setOwnOffer(this.selectedOffer);
    this.router.navigate(['helper/delivery']);
  }

  returnShoppingCart(shoppingCart: string[]) {
    this.output = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < shoppingCart.length; i++) {
      console.log(shoppingCart[i]);
      this.output += shoppingCart[i] + ', ';
    }
    return this.output;
  }
}
