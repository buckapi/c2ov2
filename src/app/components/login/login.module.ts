import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    NgxUiLoaderModule
  ]
})
export class LoginModule { }
