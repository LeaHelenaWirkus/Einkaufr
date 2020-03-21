import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { SetupComponent } from './setup/setup.component';
import { ShoppingListComponent } from './setup/shopping-list/shopping-list.component';
import { CompleteComponent } from './setup/complete/complete.component';
import { LocationComponent } from './setup/location/location.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SetupComponent,
    ShoppingListComponent,
    CompleteComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InquiryRoutingModule,
  ]
})
export class InquiryModule {
}
