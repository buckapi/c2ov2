import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistClientsRoutingModule } from './dist-clients-routing.module';
import { DistClientsComponent } from './dist-clients.component';

import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    DistClientsComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    DistClientsRoutingModule
  ]
})
export class DistClientsModule { }
