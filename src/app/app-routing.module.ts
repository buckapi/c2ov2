import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path:'', redirectTo: '/sumary', pathMatch:'full'},
  { path: 'home',loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'dists', loadChildren: () => import('./components/dists/dists.module').then(m => m.DistsModule) },
  { path: 'distnew', loadChildren: () => import('./components/distnew/distnew.module').then(m => m.DistnewModule) },
  { path: 'orders', loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'distDetail', loadChildren: () => import('./components/distDetail/dist-detail.module').then(m => m.DistDetailModule) },
  { path: 'addOrder', loadChildren: () => import('./components/newOrderSteps/addOrder/add-order.module').then(m => m.AddOrderModule) },
  { path: 'preOrder', loadChildren: () => import('./components/newOrderSteps/preOrder/pre-order.module').then(m => m.PreOrderModule) },
  { path: 'distClients', loadChildren: () => import('./components/distClients/dist-clients.module').then(m => m.DistClientsModule) },
  { path: 'orderDetail', loadChildren: () => import('./components/orderDetail/order-detail.module').then(m => m.OrderDetailModule) },
  { path: 'unavailable', loadChildren: () => import('./components/unavailable/unavailable.module').then(m => m.UnavailableModule) },
  { path: 'sumary', loadChildren: () => import('./components/sumary/sumary.module').then(m => m.SumaryModule) }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
