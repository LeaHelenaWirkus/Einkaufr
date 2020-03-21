import { Component, OnInit } from '@angular/core';
import { LocationService, SearchAddressResult } from "../../../services/location.service";
import { Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private selectedResult: SearchAddressResult;

  constructor(
    private locationService: LocationService
  ) {
  }

  private searchUpdated: Subject<string> = new Subject<string>();

  public searchResults: SearchAddressResult[] | null = null;

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
        catchError((e, obs) => {
          console.error(e);
          this.searchResults = null;
          return obs;}),
      )
      .subscribe(value => this.searchResults = value);
  }
}
