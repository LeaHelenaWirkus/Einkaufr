import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SetupSharedDataService} from '../../setup-shared-data.service';
import {OfferService} from '../../../services/offer.service';
import {UserOffer} from '../../../UserOffer';
import {UserCoordinate} from '../../../UserCoordinate';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  offer: UserOffer;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private route: ActivatedRoute,
    private data: SetupSharedDataService,
    private useService: UserService
  ) {
  }

  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: string[] = [];

  ngOnInit(): void {
    this.items = [
      'Dummy Produkt #1',
      'Dummy Produkt #2'
    ];
  }

  addItem() {
    const value = this.addItemForm.controls.newItem.value;
    console.log("addItem");
    this.items.push(value);
    // clear input for next item

    this.addItemForm.controls.newItem.setValue('');
  }

  removeItem(item: string) {
    this.items = this.items.filter(i => i !== item);
  }

  isValid() {
    return this.items.length > 0;
  }

  continue() {
    if (this.isValid()) {
      this.data.shoppingList = this.items;
      this.buildOffer();
      this.offerService.setOwnOffer(this.offer);
      this.router.navigate(['../complete'], {relativeTo: this.route});
    }
  }

  buildOffer() {
    const userCoordinate: UserCoordinate = {
      id: 0,
      latitude: this.data.selectedLocation.latitude,
      longitude: this.data.selectedLocation.longitude,
    };
    this.offer = {
      id: 0,
      owner: this.useService.getUserId(),
      helper: '',
      title: 'Brauche Nahrung',
      timestamp: 0,
      userCoordinate,
      offerStatus: `UNCLAIMED`,
      shoppingCart: this.data.shoppingList,
      chatTexts: []
    };
  }
}
