import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class Search {
  articulo: string = "";
  articuloFiltered = false;
  cliente: string = "";
  clienteFiltered = false;
  check=false;
}
