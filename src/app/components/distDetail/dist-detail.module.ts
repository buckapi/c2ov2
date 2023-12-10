import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistDetailRoutingModule } from './dist-detail-routing.module';
import { DistDetailComponent } from './dist-detail.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ArticulosComponent } from './articulos/articulos.component';

import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DistDetailComponent,
    ClientesComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    DistDetailRoutingModule,
    NgxUsefulSwiperModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot()
  ]
})
export class DistDetailModule { }
