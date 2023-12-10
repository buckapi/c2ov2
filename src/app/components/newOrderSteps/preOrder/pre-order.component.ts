import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@services/yeoman.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  order: any = { idClient: '', idDist: '', order: [], total: '', totalArticulos: '' };
  calling = true;
  constructor(
    public authRESTService: AuthRESTService,
    public router: Router,
    private renderer: Renderer2,
    public dataApiService: DataApiService,
    public yeoman: Yeoman, private cdr: ChangeDetectorRef
  ) {
    this.yeoman.go = false;
    this.yeoman.goMessage = '';
    if (this.yeoman.neworder.length < 1) { this.router.navigate(['addOrder']); };
    this.checkUser();
    this.calculateTotal();
    if (this.mainWrapper) {
      this.renderer.addClass(this.mainWrapper.nativeElement, 'show menu-toggle');
    }
    $('#main-wrapper').addClass("show menu-toggle");
  }
  outOfNewOrder(i: any) {
    this.yeoman.neworder.splice(i, 1);
    if (this.yeoman.neworder.length < 1) { this.router.navigate(['addOrder']); };

    this.calculateTotal();
  }
  plus(i: number) {
    const item = this.yeoman.neworder[i];
    if (item) {
      item.cantidad++;
      this.applyDiscount(item); 
      // this.calculateTotal(); 
    }
  }
  minus(i: number) {
    const item = this.yeoman.neworder[i];
    if (item && item.cantidad > 1) {
      const precioParaIVA = item.precioConDescuento !== undefined && item.precioConDescuento !== 0
        ? item.precioConDescuento
        : item.articulo.arprecio;
      const ivaToRemove = (item.articulo.ariva / 100) * (precioParaIVA * item.cantidad);
      this.yeoman.totalIVA -= ivaToRemove;
      item.cantidad--;
      this.applyDiscount(item); 
      // this.calculateTotal(); 
    }
  }
 /**
 * Aplica descuentos al artículo y actualiza su precio con descuento.
 * @param item Artículo al que se aplica el descuento.
 */
applyDiscount(item: any) {
  const cantidad = item.cantidad;
  const articulo = item.articulo;
  let descuentoTotal = articulo.ardescuento;
  let descuentoIndex = -1;

  // Verifica si existen descuentos promocionales y los aplica si se cumplen las condiciones
  if (articulo.descuentoPromocional && articulo.descuentoPromocional.length > 0) {
    for (let i = 0; i < articulo.descuentoPromocional.length; i++) {
      // Comprueba si la cantidad del artículo es igual o mayor al umbral del descuento y si el descuento no es 0
      if (cantidad >= articulo.descuentoPromocional[i] && articulo.descuentoPromocional[i] !== 0) {
        descuentoIndex = i;
        descuentoTotal = 0;
        descuentoTotal = articulo.ardescuento + articulo.descuentoPorcentaje[i];
      } else {
        break; // Sale del bucle si no se cumple la condición
      }
    }
  }

  // Calcula el nuevo precio con descuento para el artículo
  item.articulo.precioConDescuento = item.articulo.arprecio * (1 - descuentoTotal / 100);
  item.articulo.descuentoIndex = descuentoIndex;

  // Encuentra el artículo correspondiente en el pedido y actualiza sus detalles
  const orderItem = this.yeoman.neworder.find((orderItem) => orderItem.articulo.arcodigo === articulo.arcodigo);
  if (orderItem) {
    orderItem.articulo.precioConDescuento = item.articulo.precioConDescuento;
    orderItem.articulo.descuentoIndex = item.articulo.descuentoIndex;
    orderItem.descuentoIndex = item.articulo.descuentoIndex;
    orderItem.articulo.cantidad = cantidad;
    orderItem.precioConDescuento = item.articulo.precioConDescuento;
  }

  // Realiza una detección de cambios en la vista y recalcula el total del pedido
  this.cdr.detectChanges();
  this.calculateTotal();
}
  calculateTotal() {
    this.yeoman.totalOrder = 0;
    this.yeoman.totalIVA = 0; 
    this.yeoman.totalDescuento = 0; 
    for (const item of this.yeoman.neworder) {
      if (item.articulo.arcodigo === "-" && item.cantidad === 1 && item.articulo.arnombre === undefined) {
        // Este elemento cumple las condiciones para ser eliminado.
        continue;
      }
      if (item.articulo.arnombre){
      const subtotal = (item.precioConDescuento ?? item.articulo.arprecio) * item.cantidad;
      this.yeoman.totalOrder += subtotal; 
      this.yeoman.totalIVA += (item.articulo.ariva / 100) * subtotal;
      this.yeoman.totalDescuento += (item.articulo.arprecio * item.cantidad - subtotal) || 0;
    }}
  }
  procesar() {
    for (let i = this.yeoman.neworder.length - 1; i >= 0; i--) {
      const item = this.yeoman.neworder[i];
      if (item && item.articulo && item.articulo.arcodigo === "-" && item.cantidad === 1 && item.articulo.arnombre === undefined) {
        this.yeoman.neworder.splice(i, 1); // Elimina el elemento en la posición i
      }
    }
    this.order.idClient = this.yeoman.idClient;
    this.order.idDist = this.yeoman.idDist;
    this.order.order = this.yeoman.neworder;
    this.order.status = 'nueva';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.order.ref = randomLetter + randomDigits;
    this.order.clientEmail = this.yeoman.clientEmail;
    this.order.totalIVA = this.yeoman.totalIVA;
    this.order.totalDescuento=this.yeoman.totalDescuento;
    this.order.total = this.yeoman.totalOrder;
    this.order.totalArticulos = this.yeoman.neworder.length ;
    this.order.clcodigo=this.yeoman.client.cliCodigo;
    console.log("codigo para filtro: ",this.order.clcodigo);
    this.dataApiService.saveOrder(this.order).subscribe(response => {
      this.yeoman.neworder = [];
      this.yeoman.catalogoCargado = false;
      this.yeoman.totalIVA = 0;
      this.yeoman.totalOrder = 0;
      this.yeoman.orderSize = 0;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Orden enviada',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['']);
    }
    );
  }
  imprimirTabla(data: any) {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }
    const header = Object.keys(data[0]);
    const columnWidths = header.map((key) =>
      Math.max(...data.map((item) => String(item[key]).length))
    );
    const separator = "+-" + columnWidths.map((width) => "-".repeat(width)).join("-+-") + "-+";
    data.forEach((item) => {
   
      });
  }
  removeIVA(i: any) {
    this.yeoman.totalIVA = this.yeoman.totalIVA - (((this.yeoman.neworder[i].articulo.ariva / 100) * this.yeoman.neworder[i].articulo.arprecio) * (this.yeoman.neworder[i].cantidad));
    this.calculateTotal();
  }
  ngOnInit(): void {
  }
  checkUser() {
    const idFind = this.authRESTService.getCurrentUser().id;
    if (idFind !== undefined) {
      this.dataApiService.getClientBy(idFind).subscribe((res: any) => {
        const idClient = res[0].idUser;
        const idDist = res[0].idDist;
        this.setIdClient(idClient, idDist);
      });
    }
  }
  setIdClient(idClient: any, idDist: any) {
    this.yeoman.idClient = idClient;
    this.yeoman.idDist = idDist;
  }
}
