import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistsRoutingModule } from './dists-routing.module';
import { DistsComponent } from './dists.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { FilePickerModule } from  'ngx-awesome-uploader';
@NgModule({
  declarations: [
    DistsComponent
  ],
  imports: [
    CommonModule,
    DistsRoutingModule, 
    FilePickerModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
  ],exports:[FilePickerModule]
})
export class DistsModule { }
