import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreOrderRoutingModule } from './pre-order-routing.module';
import { PreOrderComponent } from './pre-order.component';


import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    PreOrderComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    
    ReactiveFormsModule,
    CommonModule,
    PreOrderRoutingModule
  ]
})
export class PreOrderModule { }
