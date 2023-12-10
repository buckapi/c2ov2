import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnavailableComponent } from './unavailable.component';

const routes: Routes = [{ path: '', component: UnavailableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnavailableRoutingModule { }
