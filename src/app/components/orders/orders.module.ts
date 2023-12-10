import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DebounceDirective } from '@directives/debounce.directive';

@NgModule({
  declarations: [
    OrdersComponent,DebounceDirective
  ],
  imports: [
    LazyLoadImageModule,
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
