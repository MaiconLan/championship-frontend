import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './message/message.component';
import { InputMessageComponent } from './input-message/input-message.component';


@NgModule({
  declarations: [MessageComponent, InputMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [MessageComponent, InputMessageComponent]
})
export class SharedModule { }
