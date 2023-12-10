import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnavailableRoutingModule } from './unavailable-routing.module';
import { UnavailableComponent } from './unavailable.component';


@NgModule({
  declarations: [
    UnavailableComponent
  ],
  imports: [
    CommonModule,
    UnavailableRoutingModule
  ]
})
export class UnavailableModule { }
