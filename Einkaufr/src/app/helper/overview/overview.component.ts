import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Angebot} from "./Angebot";
import {UserOffer} from "../../UserOffer";
import {UserCoordinate} from "../../UserCoordinate";
import {OfferServiceService} from "../../offer-service.service";



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private offers: OfferServiceService
  ) { }
  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: UserOffer[];
  private output: string;

  ngOnInit(): void {
    /*this.items = [
      new Angebot("Einkaufen", "Ich brauche xyz"),
      new Angebot( "Hund ausführen", "Mein Hund xyz muss raus")
    ];*/
    this.offers.getOffers().subscribe(
      value => {console.log("Value for item " + value[0].id);
      this.items = value;
      console.log("Items after push" + this.items[0].id)}
    );
    this.offers.sendTestOffer().subscribe(
      value => console.log(value)
    )
    console.log("Items: " + this.items);

  }


  moreInfos(item :UserOffer){
      //TODO Modal mit Details öffnen
  }

  test(){
    this.offers.getOffers().subscribe(
      value => console.log(value),
      error => console.log("error"));
  }


  returnShoppingCart(shoppingCart: string[]) {
    this.output = '';
    for (let i = 0; i < shoppingCart.length; i++) {
      console.log(shoppingCart[i]);
      this.output += shoppingCart[i] + ", ";
    }
    return this.output;
  }
}
