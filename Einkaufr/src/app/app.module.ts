import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './helper/input/input.component';
import { OverviewComponent } from './helper/overview/overview.component';
import { DetailviewComponent } from './helper/detailview/detailview.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InquiryModule } from './inquiry/inquiry.module';
import { DeliveryComponent } from './helper/delivery/delivery.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'helper/input', component: InputComponent},
  {path: 'helper/overview', component: OverviewComponent},
  {path: 'helper/delivery', component: DeliveryComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DetailviewComponent,
    OverviewComponent,
    DeliveryComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    InquiryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
