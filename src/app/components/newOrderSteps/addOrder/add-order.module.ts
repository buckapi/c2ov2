import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrderRoutingModule } from './add-order-routing.module';
import { AddOrderComponent } from './add-order.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FilePickerModule } from  'ngx-awesome-uploader';

import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Yeoman } from '@app/services/yeoman.service';
@NgModule({
  declarations: [
    AddOrderComponent
  ],
  providers:[Yeoman],
  imports: [  
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddOrderRoutingModule,
    NgxPaginationModule,
    NgxUsefulSwiperModule,
    NgxUiLoaderModule,
    SweetAlert2Module.forRoot()
  ]
})
export class AddOrderModule { }
