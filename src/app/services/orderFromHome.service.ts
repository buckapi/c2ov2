import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class OrderFromHome {
 
  
    order: { articulo: any; iva:any,cantidad: number;precioConDescuento:number ,descuentoIndex:number}[] = [];

}
