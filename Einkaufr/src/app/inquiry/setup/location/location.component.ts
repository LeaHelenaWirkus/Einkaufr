import { Component, OnInit } from '@angular/core';
import { LocationService, SearchAddressResponse } from "../../../services/location.service";
import { Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private locationService: LocationService
  ) {
  }

  private searchUpdated: Subject<string> = new Subject<string>();

  public searchResults: SearchAddressResponse | null = null;

  onSearchKeyUp(event: any) {
    const value: string = event.target.value;
    this.searchUpdated.next(value);
  }

  ngOnInit(): void {
    this.searchUpdated
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(v => v != ''),
        switchMap(v => this.locationService.coordinatesFromSearch(v)),
        // log error, but don't end pipe
        catchError((e, obs) => {console.error(e); return obs;}),
      )
      .subscribe(value => this.searchResults = value);
  }
}
