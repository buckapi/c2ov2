import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistsComponent } from './dists.component';

const routes: Routes = [{ path: '', component: DistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistsRoutingModule { }
