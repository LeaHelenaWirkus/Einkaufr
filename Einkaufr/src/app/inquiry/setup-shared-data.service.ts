import { Injectable } from '@angular/core';
import { Location } from "./setup/location/location.component";

@Injectable({
  providedIn: 'root'
})
export class SetupSharedDataService {
  public selectedLocation: Location | null = null;
  public shoppingList: string[] | null = null;
}
