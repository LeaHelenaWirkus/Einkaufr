import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Angebot} from './Angebot';
import {OfferServiceService} from '../../offer-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  selectedOffer: Angebot = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private offers: OfferServiceService
  ) {}

  public addItemForm: FormGroup = this.fb.group({
    newItem: ['']
  });

  public items: Angebot[] = [];

  ngOnInit(): void {
    this.items = [
      new Angebot('Einkaufen', 'Ich brauche xyz'),
      new Angebot('Hund ausführen', 'Mein Hund xyz muss raus')
    ];
    this.offers.sendOffer().subscribe(
      value => this.test()
    );
  }


  moreInfos(item: Angebot) {
    // TODO Modal mit Details öffnen
    this.selectedOffer = item;
  }

  takeOffer() {
    this.offers.setOwnOffer(this.selectedOffer);
    this.router.navigate(['helper/delivery']);
  }


  test() {
    this.offers.getOffers().subscribe(
      value => console.log(value),
      error => console.log('error'));
  }
}
