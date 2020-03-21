import { Component } from '@angular/core';
import { LocationService, SearchAddressResponse } from "../../../services/location.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  constructor(
    private locationService: LocationService
  ) {
  }

  public searchResults: SearchAddressResponse | null = null;

  onChange(event: any) {
    this.locationService.coordinatesFromSearch(event.target.value)
      .subscribe(value => this.searchResults = value);
  }
}
