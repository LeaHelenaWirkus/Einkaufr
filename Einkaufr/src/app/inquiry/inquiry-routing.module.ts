import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from "./setup/location/location.component";
import { ShoppingListComponent } from "./setup/shopping-list/shopping-list.component";
import { SetupComponent } from "./setup/setup.component";
import { CompleteComponent } from "./setup/complete/complete.component";


const routes: Routes = [
  {path: 'inquiry', children: [
      {path: '', redirectTo: 'setup', pathMatch: 'full'},
      {
        path: 'setup',
        component: SetupComponent,
        children: [
          {path: 'location', component: LocationComponent},
          {path: 'shopping-list', component: ShoppingListComponent},
          {path: 'complete', component: CompleteComponent},
          {path: '', redirectTo: 'location', pathMatch: 'full'},
        ]
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule {
}
