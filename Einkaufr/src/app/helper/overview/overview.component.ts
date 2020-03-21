import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Angebot} from "./Angebot";
import {UserOffer} from "../../UserOffer";
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

  public items: Angebot[] = [];

  ngOnInit(): void {
    this.items = [
      new Angebot("Einkaufen", "Ich brauche xyz"),
      new Angebot( "Hund ausführen", "Mein Hund xyz muss raus")
    ];
    this.offers.sendOffer().subscribe(
      value => this.test()
    );
  }


  moreInfos(item :Angebot){
      //TODO Modal mit Details öffnen
  }

  test(){
    this.offers.getOffers().subscribe(
      value => console.log(value),
      error => console.log("error"));
  }
}
