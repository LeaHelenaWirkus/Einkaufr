import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatAreaComponent} from './chat-area.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ChatAreaComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ChatAreaComponent
  ]
})
export class ChatAreaModule { }
