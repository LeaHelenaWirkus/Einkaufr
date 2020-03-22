import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatAreaComponent} from './chat-area.component';



@NgModule({
  declarations: [ChatAreaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChatAreaComponent
  ]
})
export class ChatAreaModule { }
