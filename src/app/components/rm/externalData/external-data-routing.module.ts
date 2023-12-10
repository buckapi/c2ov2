import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalDataComponent } from './external-data.component';

const routes: Routes = [{ path: '', component: ExternalDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalDataRoutingModule { }
