import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreOrderComponent } from './pre-order.component';

const routes: Routes = [{ path: '', component: PreOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreOrderRoutingModule { }
