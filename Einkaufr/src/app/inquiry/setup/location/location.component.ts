import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationService, SearchAddressResult, SearchAddressResponse } from "../../../services/location.service";
import { Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs/operators";
import { FormBuilder } from "@angular/forms";
import { SetupSharedDataService } from "../../setup-shared-data.service";
import { ActivatedRoute, Router } from "@angular/router";

export interface Location {
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private data: SetupSharedDataService
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
          return obs;
        }),
      )
      .subscribe(value => this.searchResults = value);
  }

  onResultSelected(id: string) {
    const selectedResult = this.searchResults.find(r => r.id === id);
    this.data.selectedLocation = {
      longitude: selectedResult.position.lon,
      latitude: selectedResult.position.lat
    };


    this.router.navigate(['../shopping-list'], {relativeTo: this.route});
  }
}
