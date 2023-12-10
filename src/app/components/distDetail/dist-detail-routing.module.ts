import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistDetailComponent } from './dist-detail.component';

const routes: Routes = [{ path: '', component: DistDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistDetailRoutingModule { }
