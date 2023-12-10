import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistnewRoutingModule } from './distnew-routing.module';
import { DistnewComponent } from './distnew.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilePickerModule } from  'ngx-awesome-uploader';

@NgModule({
  declarations: [
    DistnewComponent
  ],
  imports: [
    CommonModule,
    DistnewRoutingModule,   
    FilePickerModule,
    HttpClientModule,
    FormsModule
    ],
    exports:[FilePickerModule]
})
export class DistnewModule { }
