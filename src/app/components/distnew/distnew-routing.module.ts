import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistnewComponent } from './distnew.component';

const routes: Routes = [{ path: '', component: DistnewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistnewRoutingModule { }
