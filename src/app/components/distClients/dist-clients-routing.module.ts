import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistClientsComponent } from './dist-clients.component';

const routes: Routes = [{ path: '', component: DistClientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistClientsRoutingModule { }
