import { Component, OnInit,Renderer2,ViewChild ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import * as $ from 'jquery';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; 

import Swal from 'sweetalert2'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  visibles=false;
  constructor(
    public yeoman:Yeoman,
    private renderer: Renderer2,
    public router:Router,
    public dataApiService:DataApiService
  ) {
    // this.getOrdersByClient();
    this.yeoman.type = localStorage.getItem('type');
    $('#main-wrapper').removeClass(" menu-toggle");
    if (this.yeoman.type=='dist'){
      this.getOrdersByDist();
    }
    if (this.yeoman.type=='client'){
      this.getOrdersByClient();
    }
   }
  //  formatDateRelative(date: Date): string {
  //   return formatDistanceToNow(date, { addSuffix: true });
  // }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es }); // Usa la localización en español
  }
  ngOnInit(): void {
  }
  getOrdersByClient(){
    let clientString = localStorage.getItem('clientCard');
    if (clientString !== null) {
      let clientCard = JSON.parse(clientString);
    this.dataApiService.getOrdersByClient(clientCard.idUser).subscribe(response=>{
      this.yeoman.myOrders = response;
      this.yeoman.myOrders = this.yeoman.myOrders.reverse();
      this.classifyOrders();
    })
  }
  }
  changeStatusRQ(i:any){
this.visibles=true;

  }
  setProcesandoFromNew(i: any) {
    let order = this.yeoman.ordersNew[i];
    let orderID=order.id;
    order.status = 'procesando';
    this.dataApiService.orderUpdate(order,order.id).subscribe(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado de la orden actualizado a EN PROCESO',
        showConfirmButton: false,
        timer: 1500
      })

      this.visibles=false;
      this.getOrdersByDist();
    });
  }
  setTerminadaFromNew(i: any) {
    let order = this.yeoman.ordersNew[i];
    let orderID=order.id;
    order.status = 'terminada';
      this.dataApiService.orderUpdate(order,order.id).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Estado de la orden actualizado a TERMINADA',
          showConfirmButton: false,
          timer: 1500
        })
        this.visibles=false;
        this.getOrdersByDist()
      });
  }
  setTerminadaFromProcessing(i: any) {
    let order = this.yeoman.ordersProcessing[i];
    let orderID=order.id;
    order.status = 'terminada';
      this.dataApiService.orderUpdate(order,order.id).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Estado de la orden actualizado a TERMINADA',
          showConfirmButton: false,
          timer: 1500
        })
        this.visibles=false;
        this.getOrdersByDist()
      });
      // Manejar la respuesta si es necesario
  
  }

setPreview(i:any){
  this.yeoman.previewOrder=this.yeoman.myOrders[i]
  this.router.navigate(['/orderDetail']);
}
setPreviewNew(i:any){
  this.yeoman.previewOrder=this.yeoman.ordersNew[i]
  this.router.navigate(['/orderDetail']);
}
setPreviewPro(i:any){
  this.yeoman.previewOrder=this.yeoman.ordersProcessing[i]
  this.router.navigate(['/orderDetail']);
}
setPreviewFin(i:any){
  this.yeoman.previewOrder=this.yeoman.ordersFinished[i]
  this.router.navigate(['/orderDetail']);
}
  getOrdersByDist(){
    this.yeoman.myOrders=[];

      let distString = localStorage.getItem('dist');
        if (distString !== null) {
          let dist = JSON.parse(distString);
    this.dataApiService.getOrdersByDist('d'+dist.id).subscribe(response=>{
      this.yeoman.myOrders = response;
      this.yeoman.myOrders = this.yeoman.myOrders.reverse();
      this.classifyOrders();
    })
  }
  
  }
  classifyOrders() {
    // Inicializa los arrays para cada estado
    this.yeoman.ordersNew = [];
    this.yeoman.ordersProcessing = [];
    this.yeoman.ordersFinished = [];
  
    // Recorre el array this.this.yeoman.myOrders
    for (const order of this.yeoman.myOrders) {
      // Clasifica los pedidos según su estado
      if (order.status === 'nueva') {
        this.yeoman.ordersNew.push(order);
      } else if (order.status === 'procesando') {
        this.yeoman.ordersProcessing.push(order);
      } else if (order.status === 'terminada') {
        this.yeoman.ordersFinished.push(order);
      }
    }
  }

}
