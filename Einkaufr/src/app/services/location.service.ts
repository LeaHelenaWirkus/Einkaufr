import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// For more fields see https://docs.microsoft.com/de-de/rest/api/maps/search/getsearchaddress#searchresultaddress
export interface SearchAddressResponse {
  results: SearchAddressResult[];
}

export interface SearchAddressResult {
  id: string;
  address: Address;
  position: Position;
}

export interface Address {
  /**
   * like 'Mitte'
   */
  municipalitySubdivision?: string;
  /**
   * like 'Berlin'
   */
  municipality: string;
  /**
   * like 'DE'
   */
  countryCode: string;
  /**
   * like 'Deutschland'
   */
  country: string;
  /**
   * like 'Unter den Linden, Berlin'
   */
  freeformAddress: string;
  /**
   * like 'Unter den Linden'
   */
  streetName?: string;
  /**
   * like '10117, 10178'
   */
  postalCode?: string;
  /**
   * like 'Berlin'
   */
  localName?: string;
}

export interface Position {
  lat: number;
  lon: number;
}


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly subscriptionKey: string;

  constructor(
    private http: HttpClient
  ) {
    this.subscriptionKey = environment.azureMaps.authKey;
  }

  public coordinatesFromSearch(query: string): Observable<SearchAddressResult[]> {
    const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&query=${query}&subscription-key=${this.subscriptionKey}`;
    return this.http
      .get<SearchAddressResponse>(url)
      .pipe(
        map(r => r.results)
      );
  }
}

