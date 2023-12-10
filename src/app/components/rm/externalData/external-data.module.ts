import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalDataRoutingModule } from './external-data-routing.module';
import { ExternalDataComponent } from './external-data.component';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { Yeoman } from '@app/services/yeoman.service';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ExternalDataComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    ExternalDataRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ExternalDataComponent],
  providers:[
    ExistenciaService,Yeoman
  ]
})
export class ExternalDataModule { }
