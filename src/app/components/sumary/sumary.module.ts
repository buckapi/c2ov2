import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumaryRoutingModule } from './sumary-routing.module';
import { SumaryComponent } from './sumary.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [
    SumaryComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    NgxUiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SumaryRoutingModule
  ]
})
export class SumaryModule { }
