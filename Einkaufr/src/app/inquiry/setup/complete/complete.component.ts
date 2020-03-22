import { Component, OnInit } from '@angular/core';
import {UserCoordinate} from '../../../UserCoordinate';
import {UserOffer} from '../../../UserOffer';
import {SetupSharedDataService} from '../../setup-shared-data.service';
import {OfferService} from '../../../services/offer.service';
import {Router} from '@angular/router';
import {ChatText} from '../../../ChatText';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  constructor(
    private data: SetupSharedDataService,
    private offerService: OfferService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  offerSolved() {
    this.offerService.offerSolved();
    this.router.navigate(['']);
  }

}
