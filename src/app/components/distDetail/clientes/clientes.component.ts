import { Component, OnInit,Renderer2,ViewChild ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { tap, count } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { SwiperOptions } from 'swiper';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importa las clases necesarias
import { Observable ,of} from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
// @ViewChild('mainWrapper', { static: false }) mainWrapper?: ElementRef<any>; // Nota el uso de "?"
@ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  
viewSelected:boolean=true;
  combinedData:any[]=[];
  articulos:any[]=[];
  categorias:any[]=[];
  clientes:any[]=[];
  dists:any;
  sizes:any = [[], [], []];
  totalArticulos: { [distId: string]: number } = {};
  totalCategorias: { [distId: string]: number } = {};
  totalClientes: { [distId: string]: number } = {};
  p: number = 1;
  page: number = 1;
  count: number = 0;
  itemsPP:number=10;
  options: number[] = [10, 50, 100];
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  artSelected:boolean=false;
  cliSelected:boolean=false;
  selected: any = {
    arnombre: '',
    arcodigo: 0
  };
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };  

  constructor
    (
      private renderer: Renderer2,
      public yeoman:Yeoman,
      public http:HttpClient,
      public router:Router,
      public dataApiService:DataApiService
    ) {  
      if (this.mainWrapper) {
        this.renderer.addClass(this.mainWrapper.nativeElement, 'show menu-toggle');
      }
      $('#main-wrapper').addClass("show menu-toggle");
      if(this.yeoman.preview !==undefined){

        if( this.yeoman.preview.images ===undefined){this.router.navigate([''])}
      }
      if(this.yeoman.previewType=='dist'){}
      this.loadDists();
      this.loadArticulos();
      this.loadCategorias();

      this.loadClientes();
    }
    changeView(){
      this.viewSelected=!this.viewSelected;
    }
    changeItemsPerPage(value: number): void {
      this.itemsPP = value;
    }
delete(){ 
  this.dataApiService.deleteProduct(this.yeoman.preview.id).subscribe(response=>{
    this.dataApiService.getAllProducts().subscribe(response=>{
      this.yeoman.all=response;
    });
  });
  this.router.navigate(['/c2oAll']);
}
// totalArt(i: any) {
//   return this.http.get<any[]>(this.combinedData[i].url).pipe(
//     tap(response => {console.log('Respuesta de la solicitud:')} ),
//     map(response => {response.length})
//   );
// }
totalArt(i: any): Observable<number> {
  if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
    return this.http.get<any[]>(this.combinedData[i].url).pipe(
      tap(response => console.log('Respuesta de la solicitud:', response)),
      map(response => response.length)
    );
  } else {
    // console.error('No se puede obtener el valor de totalArt.');
    return new Observable<number>(); // Retorna un observable vacío en caso de error
  }
}
totalCat(i: any): Observable<number> {
  if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
    return this.http.get<any[]>(this.combinedData[i].url).pipe(
      tap(response => console.log('Respuesta de la solicitud:', response)),
      map(response => response.length)
    );
  } else {
    // console.error('No se puede obtener el valor de totalCat.');
    return of(0); // Utiliza 'of' en lugar de 'Observable.of'
  }
}
// totalCli(i: any) {
//   return this.http.get<any[]>(this.combinedData[i].url).pipe(
//     tap(response => console.log('Respuesta de la solicitud:', response)),
//     map(response => response.length)
//   );
// }
totalCli(i: any): Observable<number> {
  if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
    return this.http.get<any[]>(this.combinedData[i].url).pipe(
      tap(response => console.log('Respuesta de la solicitud:', response)),
      map(response => response.length)
    );
  } else {
    // console.error('No se puede obtener el valor de totalCli.');
    return new Observable<number>(); // Retorna un observable vacío en caso de error
  }
}

loadArticulos(){
  this.dataApiService.getArticulos(this.yeoman.preview.url).subscribe(response=>{
    this.articulos=response;
  });
}
loadCategorias(){
  this.dataApiService.getCategories(this.yeoman.preview.url).subscribe(response=>{
    this.categorias=response;
  });
}

loadClientes(){
  this.dataApiService.getClientes(this.yeoman.preview.url).subscribe(response=>{
    this.clientes=response;
  });
}
loadDists(){
  this.dataApiService.getAllDists().subscribe(response=>{
    this.dists=response;
    this.calcularTotales();
    this.loadSizes();
  });
}
loadSizes() {
  // Aquí puedes usar this.combinedData para acceder a los resultados combinados
  for (let i = 0; i < this.dists.length; i++) {
    this.totalArt(i).subscribe(count => {
      this.sizes[0][i] = count;
    });

    this.totalCat(i).subscribe(count => {
      this.sizes[1][i] = count;
    });

    this.totalCli(i).subscribe(count => {
      this.sizes[2][i] = count;
    });
  }

}
calcularTotales(): void {
  for (const dist of this.dists) {
    this.dataApiService.getArticulos(dist.url).subscribe(articulos => {
      this.totalArticulos[dist.id] = articulos.length;
    });

    this.dataApiService.getCategories(dist.url).subscribe(categorias => {
      this.totalCategorias[dist.id] = categorias.length;
    });

    this.dataApiService.getClientes(dist.url).subscribe(clientes => {
      this.totalClientes[dist.id] = clientes.length;
    });
  }
}
select(product:any){
  this.artSelected=true;
  this.selected=product;

}
cancelDelete(){}
  ngOnInit(): void {
  }
}